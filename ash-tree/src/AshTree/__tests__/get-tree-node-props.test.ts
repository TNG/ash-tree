// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import {
  getPathsToExpand,
  getTreeNodeProps,
  isChildOfSelected,
  isSelected,
} from '../utils/get-tree-node-props';
import { NodesForTree } from '../types';

describe('getTreeNodeProps', () => {
  it('non-empty folders are expandable', () => {
    const nodes: NodesForTree = { non_empty: { content: 1 } };
    const expandedNodes = new Set<string>(['root/non_empty/']);
    const virtualizedTreeNodeData = getTreeNodeProps(
      nodes,
      'root/',
      expandedNodes,
      'root/non_empty/',
      () => false,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      20,
    );

    expect(virtualizedTreeNodeData[0].isExpandable).toBe(true);
  });

  it('empty folders are not expandable', () => {
    const nodes: NodesForTree = { empty: {} };
    const expandedNodes = new Set<string>(['root/non_empty/']);
    const virtualizedTreeNodeData = getTreeNodeProps(
      nodes,
      'root/',
      expandedNodes,
      'root/empty/',
      () => false,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      20,
    );

    expect(virtualizedTreeNodeData[0].isExpandable).toBe(false);
  });
});

describe('getTreeNodeProps helpers', () => {
  it('isSelected works as expected', () => {
    const firstPath = '/adapters/.settings/org';
    const secondPath = '/adapters/.settings';
    const selectedPath = '/adapters/.settings';
    expect(isSelected(firstPath, selectedPath)).toBe(false);
    expect(isSelected(secondPath, selectedPath)).toBe(true);
  });

  it('isChildOfSelected works as expected', () => {
    const path = '/adapters/';
    const firstChildPath = '/adapters/.settings/org';
    const secondChildPath = '/adapters/.settings/';
    const firstNotChild = '/release.sh';
    const secondNotChild = '/adapters/';
    expect(isChildOfSelected(firstChildPath, path)).toBe(true);
    expect(isChildOfSelected(secondChildPath, path)).toBe(true);
    expect(isChildOfSelected(firstNotChild, path)).toBe(false);
    expect(isChildOfSelected(secondNotChild, path)).toBe(false);
  });

  it('getPathsToExpand returns correct paths', () => {
    const path = '/parent/';
    const node: NodesForTree | 1 = {
      directory: {
        subdirectory: { 'something.js': 1 },
      },
    };
    const expectedPathsToExpand: Set<string> = new Set([
      '/parent/',
      '/parent/directory/',
      '/parent/directory/subdirectory/',
    ]);

    expect(getPathsToExpand(path, node)).toEqual(expectedPathsToExpand);
  });
});
