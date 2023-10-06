// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import { ReactOneTree } from '../ReactOneTree';
import { render, screen } from '@testing-library/react';
import { NodesForTree, PathPredicateForTree } from '../types';

const testNodes: NodesForTree = {
  '': {
    thirdParty: {
      'package_1.tr.gz': 1,
      'package_2.tr.gz': 1,
    },
    root: {
      src: {
        'something.js': 1,
      },
      'package.json': 1,
    },
  },
  docs: { 'readme.md': 1 },
};

export function renderVirtualizedTree(
  expandedPaths: Set<string>,
  isFileWithChildren: PathPredicateForTree = (): boolean => false,
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockOnSelect: jest.Mock<unknown, any, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockOnToggle: jest.Mock<unknown, any, unknown>;
} {
  const mockOnSelect = jest.fn();
  const mockOnToggle = jest.fn();
  render(
    <ReactOneTree
      expandedPaths={expandedPaths}
      isFileWithChildren={isFileWithChildren}
      onSelect={mockOnSelect}
      onToggle={mockOnToggle}
      nodes={testNodes}
      selectedPath={'/'}
      getTreeNodeLabel={
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (nodeName, node, nodePath): ReactElement => <div>{nodeName || '/'}</div>
      }
      cardHeight={20}
      maxHeight={5000}
    />,
  );
  return { mockOnSelect, mockOnToggle };
}

export function getLabelLine(label: string): HTMLElement {
  const treeLabel = screen.getByText(label);

  return (treeLabel.parentElement as HTMLElement).parentElement as HTMLElement;
}
