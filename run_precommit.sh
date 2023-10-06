#!/usr/bin/env bash

# SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
# SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
#
# SPDX-License-Identifier: Apache-2.0

set -euo pipefail

cd "$( dirname "${BASH_SOURCE[0]}" )"

echo "lint"
yarn lint

echo "type checking"
yarn test-compile

echo "copyright checking"
reuse lint
