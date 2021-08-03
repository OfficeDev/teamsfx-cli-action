// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from 'path'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class ActionInputs {
  static readonly Commands: string = 'commands'
}

export class Commands {
  static readonly CommandSpace: string = ' '
  static readonly TeamsfxCliName: string = `npx teamsfx`
  static readonly AddOptionPrefix = (optionName: string): string =>
    `--${optionName}`
  static readonly NpmCi: string = 'npm ci'
}

export class ErrorNames {
  static readonly InputsError: string = 'InputsError'
  static readonly InternalError: string = 'InternalError'
}

export class Suggestions {
  static readonly RerunWorkflow: string =
    'Please rerun the workflow or pipeline.'
  static readonly CreateAnIssue: string = 'Please create an issue on GitHub.'
}

export class Pathes {
  static readonly TeamsfxCliPath = (workdir: string) =>
    path.join(workdir, 'node_modules', '@microsoft', 'teamsfx-cli')
}

export class Messages {
  static readonly GitHubWorkspaceShouldNotBeUndefined =
    'The environment variable GITHUB_WORKSPACE should not be undefined.'
}
