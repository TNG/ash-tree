// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BasicTree } from '../BasicTree';

describe('The BasicTree', () => {
  it('renders a title', () => {
    render(<BasicTree />);

    screen.getByText('Basic Tree');
  });

  it('renders folders', () => {
    render(<BasicTree />);

    screen.getByText('/');
    screen.getByText('root');
  });

  it('renders expanded/collapsed icons', () => {
    render(<BasicTree />);

    screen.getByLabelText('collapse /');
    screen.getByLabelText('expand /root/');
  });

  it('expands folders on selection', () => {
    render(<BasicTree />);

    expect(screen.queryByText('package.json')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('root'));
    screen.getByText('package.json');
  });

  it('expands folders when clicking on the expand icon', () => {
    render(<BasicTree />);

    expect(screen.queryByText('package.json')).not.toBeInTheDocument();
    screen.getByLabelText('expand /root/');
    expect(screen.queryByLabelText('collapse /root/')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('expand /root/'));
    screen.getByText('package.json');
    expect(screen.queryByLabelText('expand /root/')).not.toBeInTheDocument();
    screen.getByLabelText('collapse /root/');
  });

  it('collapses folders when clicking on the collapse icon', () => {
    render(<BasicTree />);

    screen.getByText('root');
    expect(screen.queryByLabelText('expand /')).not.toBeInTheDocument();
    screen.getByLabelText('collapse /');

    fireEvent.click(screen.getByLabelText('collapse /'));
    expect(screen.queryByText('root')).not.toBeInTheDocument();
    screen.getByLabelText('expand /');
    expect(screen.queryByLabelText('collapse /')).not.toBeInTheDocument();
  });
});
