// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import { ReactOneTree as ReactOneTreeComponent } from './ReactOneTree/ReactOneTree';
import { NodesForTree as NodesForTreeType } from './ReactOneTree/types';
import './ReactOneTree/styles.css';

export const ReactOneTree = ReactOneTreeComponent;

export type NodesForReactOneTree = NodesForTreeType;
