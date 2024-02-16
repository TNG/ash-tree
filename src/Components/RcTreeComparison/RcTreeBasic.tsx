// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import '../../styles.css';
import { testNodes } from '../shared';
import Tree from 'rc-tree';
import { NodesForAshTree } from 'ash-tree';

// Main drawbacks of this library found so far: lack of examples, typing really difficult to understand, huge package
// size, unusable default structure (no indentation, no collapsing/expanding)
export function RcTreeBasic(): ReactElement {
  const treeData = getTreeData(testNodes);

  return (
    <div className="tree-box">
      <h1>Basic Tree</h1>
      <Tree expandAction={'click'} treeData={treeData} />
    </div>
  );
}

function getTreeData(
  nodes: NodesForAshTree,
  path: string = '',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const treeData: any = [];
  for (const name of Object.keys(nodes)) {
    const node = nodes[name];
    treeData.push({
      key: `${path}/${name}`,
      title: name ? name : '/',
      children: node && node !== 1 ? getTreeData(node) : undefined,
    });
  }

  return treeData;
}
