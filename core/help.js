const { program } = require('commander')

const handleHelp = () => {
  program.option('-d --desc', 'a tool for Backend Management System');
  program.option(
    '-t --target <target>',
    'a destination folder, eg: -t /src/components',
  );

  program.on('--help', function () {
    console.log('');
    console.log('Other:');
    console.log(' other options');
  });
};

module.exports = handleHelp;
