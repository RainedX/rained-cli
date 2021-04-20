const { createProject } = require('../utils/create.js')
const { program } = require('commander')

const handleCommand = () => {
  program
  .command('create <projectName> [options...]')
  .description('create a new project from a template')
  .action(function(projectName, options) {
    createProject(projectName, options)
  })
}

module.exports = handleCommand