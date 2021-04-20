#! /usr/bin/env node
const { program } = require('commander')
const { version } = require('../package.json')

const handleHelp = require('../core/help.js')
const handleCommand = require('../core/command.js')

program.version(version);

handleHelp();
handleCommand();

program.parse(process.argv)

// console.log(program.opts().target);