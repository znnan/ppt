import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath = path.resolve(__dirname, '../ppt-content/slides.json')
const outputPath = path.resolve(__dirname, '../src/slides.jsx')

function escapeSingle(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function serialize(val, indent = 0) {
  const pad = '  '.repeat(indent)
  const inner = '  '.repeat(indent + 1)

  if (val === null) return 'null'
  if (typeof val === 'boolean') return val.toString()
  if (typeof val === 'number') return val.toString()

  if (typeof val === 'string') {
    return `'${escapeSingle(val)}'`
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]'
    const items = val.map(v => `${inner}${serialize(v, indent + 1)}`)
    return `[\n${items.join(',\n')}\n${pad}]`
  }

  if (typeof val === 'object') {
    const keys = Object.keys(val)
    if (keys.length === 0) return '{}'
    const pairs = keys.map(k => `${inner}${k}: ${serialize(val[k], indent + 1)}`)
    return `{\n${pairs.join(',\n')}\n${pad}}`
  }

  return JSON.stringify(val)
}

const slides = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))

const serialized = serialize(slides, 0)
const output = `const slides = ${serialized}

export default slides
`

fs.writeFileSync(outputPath, output, 'utf-8')
console.log(`Generated ${outputPath} (${slides.length} slides)`)
