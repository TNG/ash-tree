// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import { List } from './List';
import {
  HeightForTree,
  PathPredicateForTree,
  NodesForTree,
  NumberOfDisplayedNodesForTree,
  TreeNodeStyle,
} from './types';
import { AshTreeNode, AshTreeNodeData } from './AshTreeNode';
import { getTreeNodeProps } from './utils/get-tree-node-props';

const DEFAULT_MAX_TREE_DISPLAYED_NODES = 5;

interface AshTreeProps {
  nodes: NodesForTree;
  getTreeNodeLabel: (
    nodeName: string,
    node: NodesForTree | 1,
    nodePath: string,
  ) => ReactElement;
  expandedPaths: Set<string>;
  selectedPath: string;
  isFileWithChildren: PathPredicateForTree;
  onSelect: (event: React.ChangeEvent<unknown>, path: string) => void;
  onToggle: (pathsToExpand: Set<string>) => void;
  ariaLabel?: string;
  cardHeight: number;
  maxHeight?: number;
  expandedNodeIcon?: ReactElement;
  nonExpandedNodeIcon?: ReactElement;
  className?: string;
  treeNodeStyle?: TreeNodeStyle;
  breakpoints?: Set<string>;
}

export function AshTree(props: AshTreeProps): ReactElement | null {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const treeNodeProps: Array<AshTreeNodeData> = getTreeNodeProps(
    props.nodes,
    '',
    props.expandedPaths,
    props.selectedPath,
    props.isFileWithChildren,
    props.onSelect,
    props.onToggle,
    props.getTreeNodeLabel,
    props.cardHeight,
  );

  const maxListLength: NumberOfDisplayedNodesForTree | HeightForTree =
    props.maxHeight
      ? { height: props.maxHeight }
      : {
          numberOfDisplayedNodes: Math.min(
            treeNodeProps.length,
            DEFAULT_MAX_TREE_DISPLAYED_NODES,
          ),
        };

  const indexToScrollTo = treeNodeProps.findIndex(
    (itemData) => itemData.path === props.selectedPath,
  );

  return props.nodes ? (
    <div aria-label={props.ariaLabel} className={props.className}>
      <div style={{ height: '100%' }}>
        <List
          length={treeNodeProps.length}
          max={maxListLength}
          cardVerticalDistance={props.cardHeight}
          getListItem={(index: number): ReactElement => (
            <AshTreeNode
              {...{
                ...treeNodeProps[index],
                expandedNodeIcon: props.expandedNodeIcon,
                nonExpandedNodeIcon: props.nonExpandedNodeIcon,
                treeNodeStyle: props.treeNodeStyle,
              }}
            />
          )}
          indexToScrollTo={indexToScrollTo}
        />
      </div>
    </div>
  ) : null;
}
