// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

export interface HeightForTree {
  height: number;
}

export interface NumberOfDisplayedNodesForTree {
  numberOfDisplayedNodes: number;
}

export interface PathPredicateForTree {
  (path: string): boolean;
}

export interface NodesForTree {
  [nodeName: string]: NodesForTree | 1;
}

export interface TreeNodeStyle {
  root?: string;
  childrenOfSelected?: string;
  selected?: string;
  treeExpandIconRoot?: string;
  treeExpandIcon?: string;
}
