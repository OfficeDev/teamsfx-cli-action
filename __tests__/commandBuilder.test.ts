// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {BuildCommandString} from '../src/utils/commandBuilder'
import {getInput, getMultilineInput} from '@actions/core'
import {Commands} from '../src/constant'

let singleInputs: any = {}
let multipleInputs: any = {}

jest.mock('@actions/core', () => ({
  ...jest.requireActual('@actions/core'),
  getInput: (name: string) => {
    return singleInputs[name] ?? ''
  },
  getMultilineInput: (name: string) => {
    return multipleInputs[name] ?? ''
  }
}))

describe('Test BuildCommandString', () => {
  afterEach(() => {
    singleInputs = {}
    multipleInputs = {}
  })

  test('Case 1: Multiple Commands + Single Option', () => {
    // Arrange
    singleInputs = {
      debug: 'true'
    }

    multipleInputs = {
      commands: ['resource', 'add', 'azure-sql']
    }
    // Act
    const cmdStr = BuildCommandString()

    // Assert
    expect(cmdStr).toBe(
      [
        Commands.TeamsfxCliName,
        'resource',
        'add',
        'azure-sql',
        '--debug',
        'true'
      ].join(Commands.CommandSpace)
    )
  })

  test('Case 2: Single Option', () => {
    // Arrange
    singleInputs = {
      version: 'true'
    }

    // Act
    const cmdStr = BuildCommandString()

    // Assert
    expect(cmdStr).toBe(
      [Commands.TeamsfxCliName, '--version', 'true'].join(Commands.CommandSpace)
    )
  })

  test('Case 3: One Command + Multiple Options', () => {
    // Arrange
    singleInputs = {
      debug: 'true',
      folder: './project'
    }

    multipleInputs = {
      commands: ['new'],
      capabilities: ['tab', 'bot']
    }

    // Act
    const cmdStr = BuildCommandString()

    // Assert
    expect(cmdStr).toBe(
      [
        Commands.TeamsfxCliName,
        'new',
        '--debug',
        'true',
        '--folder',
        './project',
        '--capabilities',
        'tab',
        'bot'
      ].join(Commands.CommandSpace)
    )
  })

  test('Case 4: One Command + One Option', () => {
    // Arrange
    singleInputs = {
      subscription: '123456'
    }

    multipleInputs = {
      commands: ['provision']
    }

    // Act
    const cmdStr = BuildCommandString()

    // Assert
    expect(cmdStr).toBe(
      [Commands.TeamsfxCliName, 'provision', '--subscription', '123456'].join(
        Commands.CommandSpace
      )
    )
  })

  test('Case 5: Specify Env', () => {
    // Arrange
    singleInputs = {
      env: 'dev'
    }

    multipleInputs = {
      commands: ['provision']
    }

    // Act
    const cmdStr = BuildCommandString()

    // Assert
    expect(cmdStr).toBe(
      [Commands.TeamsfxCliName, 'provision', '--env', 'dev'].join(
        Commands.CommandSpace
      )
    )
  })

  test('Case 6: Login Azure by Service Principal', () => {
    // Arrange
    singleInputs = {
      'service-principal': 'true',
      username: 'appid',
      password: ''
    }

    multipleInputs = {
      commands: ['account', 'login', 'azure']
    }

    // Act
    const cmdStr = BuildCommandString()

    // Assert
    expect(cmdStr).toBe(
      [
        Commands.TeamsfxCliName,
        'account',
        'login',
        'azure',
        '--service-principal',
        'true',
        '--username',
        'appid',
        '--password',
        ''
      ].join(Commands.CommandSpace)
    )
  })
})
