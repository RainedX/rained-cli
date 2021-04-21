const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const compile = (template, data) => {
  const templatePath = path.resolve(__dirname, `../templates/${template}`)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      resolve(result)
    })
  })
}

const createDirSync = (pathname) => {
  if (fs.existsSync(pathname)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathname))) {
      fs.mkdirSync(pathname)
      return true;
    }
  }
}

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}