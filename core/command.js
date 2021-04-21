const { handleCreateAction, handleAddAction } = require('./action.js')
const { program } = require('commander')

const handleCommand = () => {
  program
  .command('create <projectName> [options...]')
  .description('create a new project from a template')
  .action(handleCreateAction)

  program
  .command('addc <name>')
  .description('add a component, eg: rain addc cascader')
  .action((name) => {
    handleAddAction(name, program.opts().dest || 'src/components')
  })
}

module.exports = handleCommand