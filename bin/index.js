#! /usr/bin/env node
const { program } = require('commander')
const { version } = require('../package.json')
const handleHelp = require('../core/help.js')

program.version(version);

handleHelp();

program.parse(process.argv)

// console.log(program.opts().target);