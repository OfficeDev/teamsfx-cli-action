import * as core from '@actions/core'
import {ActionInputs, Commands} from '../constant'
import {MultipleOptions} from '../enums/multipleOptions'
import {SingleOptions} from '../enums/singleOptions'

export function BuildCommandString(): string {
  let commandPrefix = ''
  const commands = core.getMultilineInput(ActionInputs.Commands)
  if (commands.length > 0) {
    commandPrefix = `${commands.join(' ')}`
  }

  // Iterate to collect options.
  const optionsPart: string[] = []

  for (const optionName of Object.values<string>(SingleOptions)) {
    const optionValue = core.getInput(optionName)
    if (optionValue) {
      optionsPart.push(`${Commands.AddOptionPrefix(optionName)} ${optionValue}`)
    }
  }

  for (const optionName of Object.values<string>(MultipleOptions)) {
    const optionValues = core.getMultilineInput(optionName)
    if (optionValues.length > 0) {
      optionsPart.push(
        `${Commands.AddOptionPrefix(optionName)} ${optionValues.join(' ')}`
      )
    }
  }

  const commandPrefixStr = commandPrefix ? ` ${commandPrefix}` : ''
  const optionsPartStr =
    optionsPart.length > 0 ? ` ${optionsPart.join(' ')}` : ''

  return `${Commands.TeamsfxCliName}${commandPrefixStr}${optionsPartStr}`
}
