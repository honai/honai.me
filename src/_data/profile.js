const fs = require('fs/promises')
const yaml = require('js-yaml')

module.exports = async () => {
  return yaml.load(await fs.readFile(`${__dirname}/profile.yaml`, { encoding: 'utf8' }))
}
