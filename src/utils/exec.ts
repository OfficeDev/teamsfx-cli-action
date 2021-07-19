import * as exec from '@actions/exec'

export async function Execute(
  cmd: string,
  workdir = process.env.GITHUB_WORKSPACE
): Promise<number> {
  return await exec.exec(cmd, undefined, {
    cwd: workdir
  })
}
