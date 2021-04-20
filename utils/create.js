const { promisify } = require('util')
const ora = require('ora')
const chalk = require('chalk')
const download = require('download-git-repo')
const { repoUrl } = require('../config/index.js')

const createProject = async (projectName, options) => {
  const spinner = ora('downloading...')
  spinner.start();
  try {
    await promisify(download(repoUrl, projectName))
    spinner.succeed();
    console.log(`🎉  Successfully created project ${chalk.yellowBright(projectName)}.`)
    console.log('👉  Get started with the following commands:\n')
    console.log(chalk.blue(`    cd ${projectName}`))
    console.log(chalk.blue('    yarn serve'))
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(`get failed. ${err}`))
    return;
  }
}

module.exports = {
  createProject
}