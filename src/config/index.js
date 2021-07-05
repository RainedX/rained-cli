const repoUrl =
  'direct:https://xxx.git';
const promptTypeList = [
  {
    type: 'input',
    message: '是否需要帮您安装项目依赖？<y/n>',
    name: 'install',
    default: 'n',
  },
  {
    type: 'list',
    message: '请选择一个工具安装依赖',
    name: 'tool',
    default: 'yarn',
    choices: ['yarn', 'npm'],
  },
];

module.exports = {
  repoUrl,
  promptTypeList,
};
