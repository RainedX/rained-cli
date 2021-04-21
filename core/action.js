const path = require('path');
const { promisify } = require('util');
const ora = require('ora');
const chalk = require('chalk');
const download = promisify(require('download-git-repo'));
const { repoUrl } = require('../config/index.js');
const spawnCommand = require('../utils/terminal.js');
const { compile, writeToFile, createDirSync } = require('../utils/index.js');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const handleCreateAction = async (projectName, options) => {
  const spinner = ora('downloading...');
  spinner.start();
  try {
    await download(repoUrl, projectName, { clone: true });
    spinner.succeed();
    await spawnCommand(npm, ['install'], { cwd: `./${projectName}` });
    console.log(
      `🎉  Successfully created project ${chalk.yellowBright(projectName)}.`,
    );
    console.log('👉  Get started with the following commands:\n');
    console.log(chalk.green(`    cd ${projectName}`));
    console.log(chalk.green('    npm run serve'));
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
