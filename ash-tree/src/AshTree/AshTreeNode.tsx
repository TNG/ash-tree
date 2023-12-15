// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import { NodesForTree, TreeNodeStyle } from './types';
import { CollapsedIcon, ExpandedIcon, NodeIcon } from './Icons';
import { isChildOfSelected, isSelected } from './utils/get-tree-node-props';

const INDENT_PER_DEPTH_LEVEL = 12;
const SIMPLE_NODE_EXTRA_INDENT = 28;

export interface AshTreeNodeData {
  path: string;
  nodeName: string;
  node: NodesForTree | 1;
  isExpandable: boolean;
  selected: string;
  onClick: (event: React.ChangeEvent<unknown>) => void;
  onToggle: (pathsToExpand: Set<string>) => void;
  isExpandedNode: boolean;
  pathsToExpand: Set<string>;
  getTreeNodeLabel: (
    nodeName: string,
    node: NodesForTree | 1,
    path: string,
  ) => ReactElement;
  expandedNodeIcon?: ReactElement;
  nonExpandedNodeIcon?: ReactElement;
  treeNodeStyle?: TreeNodeStyle;
  nodeHeight: number;
}

export function AshTreeNode(props: AshTreeNodeData): ReactElement | null {
  const marginRight =
    ((props.path.match(/\//g) || []).length - 1) * INDENT_PER_DEPTH_LEVEL +
    (!props.isExpandable ? SIMPLE_NODE_EXTRA_INDENT : 0);

  return (
    <div
      style={{
        display: 'flex',
        height: props.nodeHeight,
      }}
    >
      <div style={{ flexShrink: 0, width: marginRight }} />
      {props.isExpandable
        ? getExpandableNodeIcon(
            props.isExpandedNode,
            props.path,
            props.pathsToExpand,
            props.onToggle,
            props.treeNodeStyle
              ? {
                  root: props.treeNodeStyle.treeExpandIconRoot,
                  icon: props.treeNodeStyle.treeExpandIcon,
                }
              : undefined,
            props.expandedNodeIcon,
            props.nonExpandedNodeIcon,
          )
        : null}
      <div
        className={`label ${props.treeNodeStyle?.root || ''} ${
          isSelected(props.path, props.selected)
            ? props.treeNodeStyle?.selected
            : isChildOfSelected(props.path, props.selected)
            ? props.treeNodeStyle?.childrenOfSelected
            : ''
        }`}
        onClick={props.onClick}
      >
        {props.getTreeNodeLabel(props.nodeName, props.node, props.path)}
      </div>
    </div>
  );
}

function getExpandableNodeIcon(
  isExpandedNode: boolean,
  path: string,
  pathsToExpand: Set<string>,
  onToggle: (pathsToExpand: Set<string>) => void,
  classNames?: { root?: string; icon?: string },
  expandedNodeIcon: ReactElement = (
    <ExpandedIcon className={classNames?.icon || ''} />
  ),
  collapsedNodeIcon: ReactElement = (
    <CollapsedIcon className={classNames?.icon || ''} />
  ),
): ReactElement {
  const ariaLabel = isExpandedNode ? `collapse ${path}` : `expand ${path}`;
  const icon = isExpandedNode ? expandedNodeIcon : collapsedNodeIcon;
  return (
    <NodeIcon
      onClick={(): void => {
        onToggle(pathsToExpand);
      }}
      ariaLabel={ariaLabel}
      icon={icon}
      className={classNames?.root || ''}
    />
  );
}
