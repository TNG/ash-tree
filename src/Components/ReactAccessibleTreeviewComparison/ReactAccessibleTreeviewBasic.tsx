// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import '../../styles.css';
import { testNodes } from '../shared';
import { NodesForAshTree } from 'ash-tree';
import TreeView, { INode } from 'react-accessible-treeview';
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils';

// Main drawbacks of this library found so far: only one root node allowed
export function ReactAccessibleTreeviewBasic(): ReactElement {
  const treeData = getTreeData({ home: testNodes });

  const nodeRenderer = ({
    element,
    getNodeProps,
    level,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSelect, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any): ReactElement => (
    <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
      {element.name}
    </div>
  );

  return (
    <div className="tree-box">
      <h1>Basic Tree</h1>
      <TreeView
        defaultExpandedIds={['/home']}
        data={treeData}
        nodeRenderer={nodeRenderer}
      />
    </div>
  );
}

function getTreeData(
  nodes: NodesForAshTree,
  parentPath: string | null = null,
  treeData: INode<IFlatMetadata>[] = [],
): INode<IFlatMetadata>[] {
  for (const name of Object.keys(nodes)) {
    const displayName = name || '/';
    const node = nodes[name];
    const nodePath = `${parentPath || ''}/${displayName}`;
    treeData.push({
      id: nodePath,
      parent: parentPath,
      name: displayName,
      children:
        node !== 1
          ? Object.keys(node).map(
              (childName: string) => `${nodePath}/${childName || '/'}`,
            )
          : [],
    });
    if (node !== 1) {
      getTreeData(node, nodePath, treeData);
    }
  }

  return treeData;
}
