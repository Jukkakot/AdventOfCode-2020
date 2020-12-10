var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const progSplit = require("./program.txt").split("\r\n")
var globalValue = 0
var done = false
var j = 0
var program = [...progSplit]
while (!done) {
    var excutedIndexes = []
    program = changeOperationAt(j, [...progSplit])
    j++
    if(program.length === 0)continue
    console.log(program)
    globalValue = 0
    for (var i = 0; i < program.length; i++) {
        
        var op = program[i].split(" ")[0]
        var value = Number(program[i].split(" ")[1])
        if(j===8) {
            console.log(i,"operation", op, value)
        }
        if (excutedIndexes.includes(i)) {
            console.log("infinite", j)
            break
        }
        excutedIndexes.push(i)
        
        if (op === "acc") {
            globalValue += value
        } else if (op === "jmp") {
            i += value - 1
        } else if (op === "nop") {
        }
        if(i === program.length-1){
            console.log("eka global value", globalValue, j, i)
            console.log("p2 answer",globalValue)
            // done = true
            // break
            return
        }
    }
    if (done) {
        console.log("global value", globalValue, j, i)
        break
    }
}
console.log("ended...",globalValue,j,i)

function changeOperationAt(index, copyProgram) {
    if(copyProgram.length === 0) return []
    // if(copy)
    var operation = copyProgram[index].split(" ")[0]
    var opValue = Number(copyProgram[index].split(" ")[1])
    if (operation === "jmp") {
        copyProgram[index] = "nop " + opValue
        return copyProgram
    }
    if (operation === "nop") {
        copyProgram[index] = "jmp " + opValue
        return copyProgram
    }
    return []

}