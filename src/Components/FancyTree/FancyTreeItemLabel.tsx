// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import { DirectoryIcon, FileIcon } from './FancyTreeIcons';
import { NodesForReactOneTree } from 'react-one-tree';

export function getFancyTreeItemLabel(
  nodeName: string,
  node: NodesForReactOneTree | 1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nodePath: string,
): ReactElement {
  const canHaveChildren = node !== 1;

  return (
    <FancyTreeItemLabel
      labelText={getDisplayName(nodeName)}
      showFolderIcon={canHaveChildren}
    />
  );
}

function isRootResource(resourceName: string): boolean {
  return resourceName === '';
}

function getDisplayName(resourceName: string): string {
  return isRootResource(resourceName) ? '/' : resourceName;
}

interface ResourceBrowserTreeItemLabelProps {
  labelText: string;
  showFolderIcon: boolean;
}

export function FancyTreeItemLabel(
  props: ResourceBrowserTreeItemLabelProps,
): ReactElement {
  const labelDetail: string | undefined = props.showFolderIcon
    ? 'This is a folder'
    : 'This is a file';

  return (
    <MuiBox className={'fancyTreeLabelRoot'}>
      {props.showFolderIcon ? (
        <DirectoryIcon labelDetail={labelDetail} />
      ) : (
        <FileIcon labelDetail={labelDetail} />
      )}
      <MuiTypography className={'fancyTreeLabelText'}>
        {props.labelText}
      </MuiTypography>
    </MuiBox>
  );
}
