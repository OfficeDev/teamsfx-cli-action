// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as core from '@actions/core'
import * as fs from 'fs-extra'
import {BaseError} from './baseError'
import {Commands, Pathes, Messages} from './constant'
import {InternalError} from './errors'
import {BuildCommandString} from './utils/commandBuilder'
import {Execute} from './utils/exec'

async function run(): Promise<void> {
  process.env.CI_ENABLED = 'true'
  try {
    if (!process.env.GITHUB_WORKSPACE) {
      throw new InternalError(Messages.GitHubWorkspaceShouldNotBeUndefined)
    }
    // To use project level teamsfx-cli, run `npm install` first.
    if (
      !(await fs.pathExists(
        Pathes.TeamsfxCliPath(process.env.GITHUB_WORKSPACE)
      ))
    ) {
      await Execute(Commands.NpmInstall)
    }
    // Set run-from = GitHubAction before run cli.
    // await Execute(Commands.SetConfigRunFromAction)

    // Construct a command string from inputs.
    const commandString = BuildCommandString()
    await Execute(commandString)
  } catch (error) {
    if (error instanceof BaseError) {
      core.setFailed(error.genMessage())
    } else {
      core.setFailed(error.message)
    }
  }
}

run()
