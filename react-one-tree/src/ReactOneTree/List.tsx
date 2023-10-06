// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { CSSProperties, ReactElement } from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';
import { HeightForTree, NumberOfDisplayedNodesForTree } from './types';

const DEFAULT_CARD_HEIGHT = 24;

interface ListProps {
  length: number;
  max: NumberOfDisplayedNodesForTree | HeightForTree;
  getListItem(index: number): ReactElement | null;
  cardVerticalDistance?: number;
  style?: CSSProperties;
  indexToScrollTo?: number;
}

function maxHeightWasGiven(
  max: NumberOfDisplayedNodesForTree | HeightForTree,
): max is HeightForTree {
  return Boolean((max as HeightForTree).height);
}

export function List(props: ListProps): ReactElement {
  const cardHeight = props.cardVerticalDistance || DEFAULT_CARD_HEIGHT;
  const maxHeight = maxHeightWasGiven(props.max)
    ? props.max.height
    : props.max.numberOfDisplayedNodes * cardHeight;
  const currentHeight = props.length * cardHeight;
  const listHeight = Math.min(currentHeight, maxHeight);

  const scrollOffset = props.indexToScrollTo
    ? props.indexToScrollTo * cardHeight < maxHeight / 2
      ? 0
      : props.indexToScrollTo * cardHeight - maxHeight / 2
    : 0;

  return (
    <div style={{ maxHeight: currentHeight, ...props.style }}>
      <VirtualizedList
        initialScrollOffset={scrollOffset}
        height={listHeight}
        width={'vertical'}
        itemSize={cardHeight}
        itemCount={props.length}
        style={{
          overflow: `auto ${currentHeight < maxHeight ? 'hidden' : 'auto'}`,
        }}
        overscanCount={1}
      >
        {({
          index,
          style,
        }: {
          index: number;
          style: CSSProperties;
        }): ReactElement => (
          <div style={{ direction: 'ltr', ...style }}>
            {props.getListItem(index)}
          </div>
        )}
      </VirtualizedList>
    </div>
  );
}
