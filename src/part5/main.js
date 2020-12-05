var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const passTxt = require("./passes.txt")
const passArr = passTxt.split("\r\n")
var idArr = []
for (pass of passArr) {
    const start = pass.substring(0, 7)
    const end = pass.slice(7)
    var rows = [...Array(128).keys()]
    for (c of start) {
        if (c === "F")
            rows = rows.slice(0, (rows.length / 2))
        else
            rows = rows.slice(rows.length / 2, rows.length)
    }
    var columns = [...Array(8).keys()]
    for (c of end) {
        if (c === "L")
            columns = columns.slice(0, (columns.length / 2))
        else
            columns = columns.slice(columns.length / 2, columns.length)
    }
    idArr.push(rows[0] * 8 + columns[0])
}
console.log("Max id:", Math.max(...idArr))
const sortedIds = idArr.sort((a, b) => a - b)
var prevN= sortedIds[0]
for(n of sortedIds){
    if(n !== prevN+1){
        console.log(n,prevN)
    }
    prevN = n
}