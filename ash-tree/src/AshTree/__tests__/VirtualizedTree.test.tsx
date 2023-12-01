// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

import { fireEvent, screen, within } from '@testing-library/react';
import { getLabelLine, renderVirtualizedTree } from './test-helpers';

describe('The VirtualizedTree', () => {
  it('renders', () => {
    renderVirtualizedTree(
      new Set(['/', '/thirdParty/', '/root/', '/root/src/', 'docs/']),
    );

    for (const label of [
      '/',
      'thirdParty',
      'package_1.tr.gz',
      'package_2.tr.gz',
      'root',
      'src',
      'something.js',
      'package.json',
      'docs',
      'readme.md',
    ]) {
      expect(screen.getByText(label));
    }
  });

  describe('has clickable labels, that call', () => {
    it('the onSelect and onToggle properties when a collapsed folder is clicked', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/']),
      );
      for (const label of ['/', 'thirdParty', 'root', 'docs']) {
        expect(screen.getByText(label));
      }

      fireEvent.click(screen.getByText('thirdParty'));
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          _reactName: 'onClick',
          type: 'click',
        }),
        '/thirdParty/',
      );
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(new Set(['/thirdParty/']));
    });

    it('the onSelect property when an expanded folder is clicked', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/', '/thirdParty/']),
      );
      for (const label of [
        '/',
        'thirdParty',
        'package_1.tr.gz',
        'package_2.tr.gz',
        'root',
        'docs',
      ]) {
        expect(screen.getByText(label));
      }

      fireEvent.click(screen.getByText('thirdParty'));
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          _reactName: 'onClick',
          type: 'click',
        }),
        '/thirdParty/',
      );
      expect(mockOnToggle).not.toHaveBeenCalled();
    });

    it('the onSelect property when a file is clicked', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/', '/thirdParty/']),
      );
      for (const label of [
        '/',
        'thirdParty',
        'package_1.tr.gz',
        'package_2.tr.gz',
        'root',
        'docs',
      ]) {
        expect(screen.getByText(label));
      }

      fireEvent.click(screen.getByText('package_1.tr.gz'));
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          _reactName: 'onClick',
          type: 'click',
        }),
        '/thirdParty/package_1.tr.gz',
      );
      expect(mockOnToggle).not.toHaveBeenCalled();
    });

    it('the onSelect and onToggle properties when a collapsed file with children is clicked', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/']),
        (path: string): boolean => path === '/thirdParty/',
      );
      for (const label of ['/', 'thirdParty', 'root', 'docs']) {
        expect(screen.getByText(label));
      }

      fireEvent.click(screen.getByText('thirdParty'));
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          _reactName: 'onClick',
          type: 'click',
        }),
        '/thirdParty/',
      );
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(new Set(['/thirdParty/']));
    });

    it('the onSelect property when an expanded file with children is clicked', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/', '/thirdParty/']),
        (path: string): boolean => path === '/thirdParty/',
      );
      for (const label of [
        '/',
        'thirdParty',
        'package_1.tr.gz',
        'package_2.tr.gz',
        'root',
        'docs',
      ]) {
        expect(screen.getByText(label));
      }

      fireEvent.click(screen.getByText('thirdParty'));
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          _reactName: 'onClick',
          type: 'click',
        }),
        '/thirdParty/',
      );
      expect(mockOnToggle).not.toHaveBeenCalled();
    });
  });

  describe('has clickable icons, that call the onToggle property', () => {
    it('when a folder is expanded', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/', '/thirdParty/']),
      );
      for (const label of [
        '/',
        'thirdParty',
        'package_1.tr.gz',
        'package_2.tr.gz',
        'root',
        'docs',
      ]) {
        expect(screen.getByText(label));
      }

      fireEvent.click(
        within(getLabelLine('thirdParty')).getByLabelText(
          'collapse /thirdParty/',
        ),
      );
      expect(mockOnSelect).not.toHaveBeenCalled();
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(new Set(['/thirdParty/']));
    });

    it('when a folder is collapsed', () => {
      const { mockOnSelect, mockOnToggle } = renderVirtualizedTree(
        new Set(['/']),
      );
      for (const label of ['/', 'thirdParty', 'root', 'docs']) {
        expect(screen.getByText(label));
      }

      fireEvent.click(
        within(getLabelLine('thirdParty')).getByLabelText(
          'expand /thirdParty/',
        ),
      );
      expect(mockOnSelect).not.toHaveBeenCalled();
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith(new Set(['/thirdParty/']));
    });
  });
});
