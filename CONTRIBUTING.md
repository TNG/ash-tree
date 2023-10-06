<!--
SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>

SPDX-License-Identifier: CC0-1.0
-->

# Contributing

Contributions are very welcome. The following will provide some helpful guidelines.



## How to contribute

### Commits

Each commit should be atomic and pass all tests. Logically unrelated changes should not be gathered in one commit.

Commit messages should be clear and fully elaborate the context and the reason for a change. The first line should
contain a brief imperative summary starting with a capitalized character and be followed by a more detailed
explanatory text separated by an empty line. If your commit refers to an issue, please post-fix it with the
issue number.

Example:
```
Short summary of changes (72 characters or less)

More detailed explanatory text, if necessary. This text can have 
several lines.

Issue: #123  (optional; if there is a related issue)
Fix: #123  (optional; if the commit resolves the issue)
```

Furthermore, commits should be signed off according to the [DCO](DCO.md).

### Pull requests

Pull requests should have a clear description that fully elaborates the context and the reason for a change.
The corresponding template should be used. If your pull request resolves an issue, please add a respective
line to the end.



## Developer's guide

This package is a React component written in TypeScript. The only further dependency is the virtualization library 
react-window. The repo ist structured on two levels:
1. the root directory contains the developing package.json, including all scripts, dev dependencies and testing app 
   dependencies,
2. the react-one-tree directory contains the source code of the virtualized tree component and its package.json, 
   including no dev dependencies and meant to be distributed with the package.

Prettier is used as a code formatter, eslint as a linter.
Unit tests are provided for all features, aided by integration tests when helpful. The testing framework is jest + react
testing library. Test are present that check for the speed and size of the component. As this is a low-level UI 
component, speed is essential, and it should be as high as possible. The size of the component should also be 
kept as small as possible.

### OS

Development under Windows, Linux, macOS is (and should remain) fully supported.

### Repo setup

Clone the react one tree repo. To install dependencies and set up the working environment, go to the repository root 
directory and run:

```bash
yarn setup
```

All useful scripts are listed in the package.json and can be run through `yarn` and can be called after cloning the
repository and installing all dependencies. To start the app based on the current state of the code, including automatic
updates after changes to the frontend, execute:

```
yarn start
```

All checks necessary for a pull request can be run with:

```
yarn ci
```

### Requirements

The following software is required for working on the repository:

- [git](https://git-scm.com/),
- [yarn](https://yarnpkg.com/en/),
- [reuse/tool](https://git.fsfe.org/reuse/tool#install) (to check that copyright information is provided, for more context see https://reuse.software/),


