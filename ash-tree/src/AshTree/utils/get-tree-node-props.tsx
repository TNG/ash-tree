// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import { PathPredicateForTree, NodesForTree } from '../types';
import { AshTreeNodeData } from '../AshTreeNode';

export function getTreeNodeProps(
  nodes: NodesForTree,
  parentPath: string,
  expandedNodes: Set<string>,
  selected: string,
  isFileWithChildren: PathPredicateForTree,
  onSelect: (event: React.ChangeEvent<unknown>, path: string) => void,
  onToggle: (pathsToExpand: Set<string>) => void,
  getTreeNodeLabel: (
    nodeName: string,
    node: NodesForTree | 1,
    path: string,
  ) => ReactElement,
  cardHeight: number,
): Array<AshTreeNodeData> {
  const sortedNodeNames: Array<string> = Object.keys(nodes).sort(
    getSortFunction(nodes, isFileWithChildren, parentPath),
  );

  let treeNodes: Array<AshTreeNodeData> = [];

  for (const nodeName of sortedNodeNames) {
    const node = nodes[nodeName];
    const nodeHeight = cardHeight - 1;
    const isExpandable =
      canNodeHaveChildren(node) && Object.keys(node).length !== 0;
    const path = getPath(nodeName, parentPath, canNodeHaveChildren(node));
    const isExpandedNode = isExpanded(path, expandedNodes);

    const pathsToExpand: Set<string> = getPathsToExpand(path, node);

    function onExpandableNodeClick(event: React.ChangeEvent<unknown>): void {
      if (!isExpandedNode) {
        onToggle(pathsToExpand);
      }
      onSelect(event, path);
    }

    function onSimpleNodeClick(event: React.ChangeEvent<unknown>): void {
      onSelect(event, path);
    }

    treeNodes.push({
      getTreeNodeLabel,
      isExpandable,
      isExpandedNode,
      path,
      pathsToExpand,
      onClick: isExpandable ? onExpandableNodeClick : onSimpleNodeClick,
      onToggle,
      node,
      nodeName,
      selected,
      nodeHeight,
    });

    if (isExpandedNode) {
      treeNodes = treeNodes.concat(
        getTreeNodeProps(
          node as NodesForTree,
          path,
          expandedNodes,
          selected,
          isFileWithChildren,
          onSelect,
          onToggle,
          getTreeNodeLabel,
          nodeHeight,
        ),
      );
    }
  }

  return treeNodes;
}

export function getPathsToExpand(
  path: string,
  node: NodesForTree | 1,
): Set<string> {
  const pathsToExpand: Set<string> = new Set([path]);
  addPathsToExpand(pathsToExpand, node, path);
  return pathsToExpand;
}

function addPathsToExpand(
  pathsToExpand: Set<string>,
  node: NodesForTree | 1,
  parentPath: string,
): void {
  const containedNodes = Object.keys(node);
  if (node !== 1 && containsExactlyOneFolder(node, containedNodes)) {
    const pathOfFirstContainedNode: string = getPathOfFirstContainedNode(
      containedNodes,
      node,
      parentPath,
    );
    pathsToExpand.add(pathOfFirstContainedNode);
    addPathsToExpand(
      pathsToExpand,
      node[containedNodes[0]],
      pathOfFirstContainedNode,
    );
  }
}

function containsExactlyOneFolder(
  node: NodesForTree,
  containedNodes: Array<string>,
): boolean {
  return (
    containedNodes.length === 1 && canNodeHaveChildren(node[containedNodes[0]])
  );
}

function getPathOfFirstContainedNode(
  containedNodes: Array<string>,
  node: NodesForTree,
  parentNodeId: string,
): string {
  return getPath(
    containedNodes[0],
    parentNodeId,
    canNodeHaveChildren(node[containedNodes[0]]),
  );
}

function getPath(nodeName: string, path: string, isFolder: boolean): string {
  return path + (isFolder ? nodeName + '/' : nodeName);
}

function isExpanded(path: string, expandedNodes: Set<string>): boolean {
  if (!isPathOfNodeWithChildren(path)) {
    return false;
  }

  for (const expandedPath of expandedNodes) {
    if (expandedPath === path) {
      return true;
    }
  }

  return false;
}

export function isSelected(path: string, selectedPath: string): boolean {
  return path === selectedPath;
}

export function isChildOfSelected(path: string, selectedPath: string): boolean {
  return (
    path.startsWith(selectedPath) &&
    !isSelected(path, selectedPath) &&
    selectedPath.slice(-1) === '/'
  );
}

function getSortFunction(
  nodes: NodesForTree,
  isFileWithChildren: PathPredicateForTree,
  path: string,
) {
  return (left: string, right: string): number => {
    const leftNode = nodes[left];
    const rightNode = nodes[right];
    const leftIsFolderOrFileWithChildren = canNodeHaveChildren(leftNode);
    const rightIsFolderOrFileWithChildren = canNodeHaveChildren(rightNode);
    const leftPath = getPath(left, path, leftIsFolderOrFileWithChildren);
    const rightPath = getPath(right, path, rightIsFolderOrFileWithChildren);

    const leftNodeIsFolder =
      leftIsFolderOrFileWithChildren && !isFileWithChildren(leftPath);
    const rightNodeIsFolder =
      rightIsFolderOrFileWithChildren && !isFileWithChildren(rightPath);

    if (leftNodeIsFolder && !rightNodeIsFolder) {
      return -1;
    } else if (!leftNodeIsFolder && rightNodeIsFolder) {
      return 1;
    }
    return left.toLowerCase().localeCompare(right.toLowerCase());
  };
}

function canNodeHaveChildren(node: NodesForTree | 1): node is NodesForTree {
  return node !== 1;
}

function isPathOfNodeWithChildren(path: string): boolean {
  return path.slice(-1) === '/';
}
