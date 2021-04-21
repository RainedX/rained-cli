const { promisify } = require('util')
const ora = require('ora')
const chalk = require('chalk')
const download = promisify(require('download-git-repo'))
const { repoUrl } = require('../config/index.js')

const handleCreateAction = async (projectName, options) => {
  const spinner = ora('downloading...')
  spinner.start();
  try {
    await download(repoUrl, projectName, {clone: true})
    spinner.succeed();
    console.log(`🎉  Successfully created project ${chalk.yellowBright(projectName)}.`)
    console.log('👉  Get started with the following commands:\n')
    console.log(chalk.green(`    cd ${projectName}`))
    console.log(chalk.green('    yarn serve'))
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(`get failed. ${err}`))
    return;
  }
}

const handleAddAction = (componentName, dest) => {
  // ejs ===> vue
}

module.exports = {
  handleCreateAction,
  handleAddAction
}