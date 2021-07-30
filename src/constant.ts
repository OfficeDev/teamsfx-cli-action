// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class ActionInputs {
  static readonly Commands: string = 'commands'
}

export class Commands {
  static readonly CommandSpace: string = ' '
  static readonly DefaultTeamsfxCliVersion: string = '0.3.1'
  static readonly TeamsfxCliName = (
    cliVersion: string = process.env.TEAMSFX_CLI_VERSION
      ? process.env.TEAMSFX_CLI_VERSION
      : Commands.DefaultTeamsfxCliVersion
  ): string => `npx -p @microsoft/teamsfx-cli@${cliVersion} teamsfx`
  static readonly AddOptionPrefix = (optionName: string): string =>
    `--${optionName}`
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
