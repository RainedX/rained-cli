const { program } = require('commander')

const handleHelp = () => {
  program.option('-d --dest <dest>', 'a destination folder, eg: -d src/components')
  program.on('--help', function () {
    console.log('');
    console.log('Usage');
    console.log(' rain --version');
  });
};

module.exports = handleHelp;
