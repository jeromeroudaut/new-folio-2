const colors = require('colors')
const compile = require('./tool/compile.js')
const minifyHtml = require('./tool/minifyHtml.js')
const minifyCss = require('./tool/minifyCss.js')
const minifyJs = require('./tool/minifyJs.js')
const copy = require('./tool/copy.js')

function runCompile () {
    compile(runMinifyHtml)
}

function runMinifyHtml () {
    minifyHtml(afterPhpMinifier)
}

function afterPhpMinifier () {
    minifyCss()
    minifyJs()
    copy()
}

runCompile()
