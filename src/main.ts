// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as core from '@actions/core'
import * as fs from 'fs-extra'
import {BaseError} from './baseError'
import {Commands, Pathes, Messages, ActionInputs} from './constant'
import {InternalError} from './errors'
import {BuildCommandString} from './utils/commandBuilder'
import {Execute} from './utils/exec'
import {cliInPacakgeJson} from './utils/checkCliInPackage'

async function run(): Promise<void> {
  process.env.CI_ENABLED = 'true'
  try {
    if (!process.env.GITHUB_WORKSPACE) {
      throw new InternalError(Messages.GitHubWorkspaceShouldNotBeUndefined)
    }
    // To make the logic compatible for V3.
    // If package.json exists under root:
    //  Keep the legacy logic to repect TTK CLI version in it.
    // else - the V3 case:
    //  Read cli-version from inputs, and install the target version of TTK CLI.
    let ttkCliInstallCmd
    const rootJsonPath = Pathes.PacakgeJsonPath(process.env.GITHUB_WORKSPACE)
    if (
      (await fs.pathExists(rootJsonPath)) &&
      (await cliInPacakgeJson(rootJsonPath))
    ) {
      ttkCliInstallCmd = Commands.NpmInstall
    } else {
      const cliVersion = core.getInput(ActionInputs.CliVersion) ?? 'latest'
      ttkCliInstallCmd = Commands.NpmInstallTTKCli(cliVersion)
    }
    core.info(`TTK CLI installation command: ${ttkCliInstallCmd}`)
    if (
      !(await fs.pathExists(
        Pathes.TeamsfxCliPath(process.env.GITHUB_WORKSPACE)
      ))
    ) {
      await Execute(ttkCliInstallCmd)
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
