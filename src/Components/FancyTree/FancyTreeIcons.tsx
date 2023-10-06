// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import FolderOutlinedIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';

interface LabelDetailIconProps {
  labelDetail?: string;
  disabled?: boolean;
}

export function DirectoryIcon({
  labelDetail,
}: LabelDetailIconProps): ReactElement {
  return (
    <FolderOutlinedIcon
      aria-label={
        labelDetail ? `Directory icon ${labelDetail}` : 'Directory icon'
      }
      className={'fancyTreeNodeIcon'}
    />
  );
}

export function FileIcon({ labelDetail }: LabelDetailIconProps): ReactElement {
  return (
    <DescriptionIcon
      className={'fancyTreeNodeIcon'}
      aria-label={labelDetail ? `File icon ${labelDetail}` : 'File icon'}
    />
  );
}
