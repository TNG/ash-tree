// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';

interface NodeIconProps {
  ariaLabel: string;
  onClick: () => void;
  icon: ReactElement;
  className?: string;
}

export function NodeIcon(props: NodeIconProps): ReactElement {
  return (
    <div
      onClick={(event): void => {
        event.stopPropagation();
        props.onClick();
      }}
      aria-label={props.ariaLabel}
      className={`iconRoot ${props.className}`}
    >
      {props.icon}
    </div>
  );
}

export function CollapsedIcon(props: { className?: string }): ReactElement {
  return (
    <svg viewBox="0 0 16 16" className={`${'icon'} ${props.className}`}>
      <path
        stroke="black"
        fill="transparent"
        strokeWidth="2px"
        d="M 5 2 L 11 8 L 5 14"
      />
    </svg>
  );
}

export function ExpandedIcon(props: { className?: string }): ReactElement {
  return (
    <svg viewBox="0 0 16 16" className={`${'icon'} ${props.className}`}>
      <path
        stroke="black"
        fill="transparent"
        strokeWidth="2px"
        d="M 14 5 L 8 11 L 2 5"
      />
    </svg>
  );
}
