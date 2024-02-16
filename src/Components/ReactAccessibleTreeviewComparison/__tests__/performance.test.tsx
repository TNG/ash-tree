// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactAccessibleTreeviewBasic } from '../ReactAccessibleTreeviewBasic';

describe('The BasicTree', () => {
  it('takes so long to expand and collapse 100 times', () => {
    render(<ReactAccessibleTreeviewBasic />);

    logTimeTakenToExpandAndCollapseRoot100TimesRcTree();
  });
});

export function logTimeTakenToExpandAndCollapseRoot100TimesRcTree(): void {
  const startTime = new Date().getTime();
  for (let i = 0; i < 100; i++) {
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('/'));
  }
  const endTime = new Date().getTime();
  console.log(
    'Time taken to render the basic rc tree 100 times: ',
    endTime - startTime,
    'ms',
  );
}
