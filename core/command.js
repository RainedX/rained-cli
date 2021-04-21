const { handleCreateAction, handleAddAction } = require('./action.js')
const { program } = require('commander')

const handleCommand = () => {
  program
  .command('create <projectName> [options...]')
  .description('create a new project from a template')
  .action(handleCreateAction)

  program
  .command('addc <name>')
  .description('add a component, eg: rain addc Home -d src/components')
  .action(handleAddAction)
}

module.exports = handleCommand