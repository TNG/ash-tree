// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React, { ReactElement } from 'react';
import '../../styles.css';
import { BasicTree } from '../BasicTree/BasicTree';
import { FancyTree } from '../FancyTree/FancyTree';

function App(): ReactElement {
  return (
    <div className="app-root">
      <BasicTree />
      <FancyTree />
    </div>
  );
}

export default App;
