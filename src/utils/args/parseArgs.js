import minimist from 'minimist'
const options = { alias: { m: 'mode', p: 'puerto', d: 'desarrollo' }, default: { m: 'fork' } }

const args = minimist(process.argv.slice(2), options)

export { args }
