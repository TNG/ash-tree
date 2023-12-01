// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import { AshTree as AshTreeComponent } from './AshTree/AshTree';
import { NodesForTree as NodesForTreeType } from './AshTree/types';
import './AshTree/styles.css';

export const AshTree = AshTreeComponent;

export type NodesForAshTree = NodesForTreeType;
