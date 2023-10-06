// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import { fireEvent, screen } from '@testing-library/react';

export function logTimeTakenToExpandAndCollapseRoot100Times(): void {
  const startTime = new Date().getTime();
  for (let i = 0; i < 100; i++) {
    fireEvent.click(screen.getByLabelText('collapse /'));
    fireEvent.click(screen.getByLabelText('expand /'));
  }
  const endTime = new Date().getTime();
  console.log(
    'Time taken to render the tree 100 times: ',
    endTime - startTime,
    'ms',
  );
}
