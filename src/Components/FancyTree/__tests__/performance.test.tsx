// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { render } from '@testing-library/react';
import { FancyTree } from '../FancyTree';
import { logTimeTakenToExpandAndCollapseRoot100Times } from '../../../test-helpers';

describe('The FancyTree', () => {
  it('takes so long to expand and collapse 100 times', () => {
    render(<FancyTree />);

    logTimeTakenToExpandAndCollapseRoot100Times();
  });
});
