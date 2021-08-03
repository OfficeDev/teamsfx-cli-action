// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as core from '@actions/core'
import {BaseError} from './baseError'
import { Commands } from './constant'
import {BuildCommandString} from './utils/commandBuilder'
import {Execute} from './utils/exec'

async function run(): Promise<void> {
  process.env.CI_ENABLED = 'true'
  try {
    // To use project level teamsfx-cli, run `npm ci` first.
    await Execute(Commands.NpmCi)
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
