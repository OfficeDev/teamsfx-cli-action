// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from 'fs-extra'

export async function cliInPacakgeJson(
  packageJsonPath: string
): Promise<boolean> {
  const res = await fs.readJson(packageJsonPath)
  return res.devDependencies && res.devDependencies['@microsoft/teamsfx-cli']
}
