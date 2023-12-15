// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement, useState } from 'react';
import '../../styles.css';
import { getFancyTreeItemLabel } from './FancyTreeItemLabel';
import { testNodes } from '../shared';
import { AshTree } from 'ash-tree';

export function FancyTree(): ReactElement {
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
      nodePathsToExpand.forEach((pathToExpand) => {
        newExpandedPaths.add(pathToExpand);
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
      <h1>Fancy Tree</h1>
      <AshTree
        expandedPaths={expandedPaths}
        isFileWithChildren={(path: string): boolean => Boolean(path)}
        onSelect={handleSelect}
        onToggle={handleToggle}
        nodes={testNodes}
        selectedPath={selectedPath}
        getTreeNodeLabel={getFancyTreeItemLabel}
        cardHeight={24}
        maxHeight={500}
        treeNodeStyle={{
          root: 'fancyTreeItemLabel',
          childrenOfSelected: 'fancyTreeItemLabelChildrenOfSelected',
          selected: 'fancyTreeItemLabelSelected',
          treeExpandIconRoot: 'fancyTreeExpandIconRoot',
        }}
      />
    </div>
  );
}
