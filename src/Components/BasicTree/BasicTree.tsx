// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement, useState } from 'react';
import '../../styles.css';
import { testNodes } from '../shared';
import { AshTree } from 'ash-tree';

export function BasicTree(): ReactElement {
  const [selectedPath, setSelectedPath] = useState<string>('/');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    new Set(['/']),
  );

  function handleToggle(nodePathsToExpand: Set<string>): void {
    const newExpandedPaths = new Set(expandedPaths);
    const [elementToExpand] = nodePathsToExpand;
    if (expandedPaths.has(elementToExpand)) {
      for (const newExpandedPath of newExpandedPaths) {
        if (newExpandedPath.startsWith(elementToExpand)) {
          newExpandedPaths.delete(newExpandedPath);
        }
      }
    } else {
      nodePathsToExpand.forEach((nodeIdToExpand) => {
        newExpandedPaths.add(nodeIdToExpand);
      });
    }
    setExpandedPaths(newExpandedPaths);
  }

  function handleSelect(
    event: React.ChangeEvent<unknown>,
    nodePath: string,
  ): void {
    setSelectedPath(nodePath);
  }

  return (
    <div className="tree-box">
      <h1>Basic Tree</h1>
      <AshTree
        expandedPaths={expandedPaths}
        isFileWithChildren={(path: string): boolean => Boolean(path)}
        onSelect={handleSelect}
        onToggle={handleToggle}
        nodes={testNodes}
        selectedPath={selectedPath}
        getTreeNodeLabel={
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (nodeName, node, nodePath): ReactElement => (
            <div style={{ lineHeight: '20px', fontSize: '16px' }}>
              {nodeName || '/'}
            </div>
          )
        }
        cardHeight={20}
        maxHeight={500}
      />
    </div>
  );
}
