import * as core from '@actions/core'
import {BaseError} from './baseError'
import {BuildCommandString} from './utils/commandBuilder'
import {Execute} from './utils/exec'

async function run(): Promise<void> {
  process.env.CI_ENABLED = 'true'
  try {
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
