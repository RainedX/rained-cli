const path = require('path');
const { promisify } = require('util');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const download = promisify(require('download-git-repo'));
const { repoUrl, promptTypeList } = require('../config/index.js');
const spawnCommand = require('../utils/terminal.js');
const { compile, writeToFile, createDirSync } = require('../utils/index.js');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const yarn = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';

const handleCreateAction = async (projectName, options) => {
  if (fs.existsSync(projectName)) {
    console.log(chalk.yellowBright('当前目录已存在同名项目，请更换项目名'));
    return;
  }
  const spinner = ora('downloading...');
  spinner.start();
  try {
    await download(repoUrl, projectName, { clone: true });
    spinner.succeed();
    console.log(
      `🎉  Successfully created project ${chalk.yellowBright(projectName)}.`,
    );
    const result = await inquirer.prompt(promptTypeList);
    if (result.install.toLowerCase() === 'y') {
      console.log("")
      console.log(chalk.green('正在帮您安装项目依赖，请稍等...'));
      console.log("")
      await spawnCommand(result.tool, ['install'], { cwd: `./${projectName}` });
    }
    console.log('👉  Get started with the following commands:\n');
    console.log(chalk.green(`    cd ${projectName}`));
    if (result.tool === 'yarn') {
      console.log(chalk.green('    yarn serve'));
    } else {
      console.log(chalk.green('    npm run serve'));
    }
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(`get failed. ${err}`));
    return;
  }
};

const handleAddAction = async (componentName, dest) => {
  // ejs ===> vue
  const result = await compile('vue-component.ejs', { name: componentName });
  const destpath = path.resolve(dest, componentName);
  // write to file
  if (createDirSync(destpath)) {
    // rain addc cascader
    // /Users/rain/Desktop/bsm/src/components/cascader/index.vue
    const targetPath = path.resolve(destpath, 'index.vue');
    writeToFile(targetPath, result);
  }
};

module.exports = {
  handleCreateAction,
  handleAddAction,
};
