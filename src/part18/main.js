var fs = require('fs');
const { versions } = require('process');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const mathSplit = require("./math.txt").split("\r\n")
var p1Value = 0
var p2Value = 0
for (line of mathSplit) {
    line = line.replace(/\s/g, '')
    var pieces = line.split("")
    // console.log("orig pieces",pieces.join(""))
    // console.log("added paras",addParas(pieces).join(""))
    // p1Value += doMath(pieces)
    p2Value += doMath(addParas(pieces))
    // console.log(doMath(addParas(pieces)))
//     console.log(doP2Math(pieces))
}
console.log("p1 answer",p1Value)
console.log("p2 answer",p2Value)
function addParas(pieces) {

    for (var p = 0;p<pieces.length;p++) {
        var piece = pieces[p]
        if(piece === "+") {
            var origP = p
            var i = p
            var paraCount = 0
            while(true){
                if(pieces[i] === ")") {
                    paraCount++
                }
                if(pieces[i] === "(") {
                    paraCount--
                }
                if (paraCount === 0 && /^\d+$/.test(pieces[i]) ||
                    paraCount === 0 && pieces[i] === "(") {
                    pieces.splice(i,0,"(")
                    break
                }
                i--
            }
            i = p+1
            paraCount = 0
            while(true){
                if(pieces[i] === "(") {
                    paraCount++
                }
                if(pieces[i] === ")") {
                    paraCount--
                }
                if (paraCount === 0 && /^\d+$/.test(pieces[i]) ||
                    paraCount === 0 && pieces[i] === ")") {
                    pieces.splice(i+1,0,")")
                    break
                }
                i++
            }
           p = origP +1
        }
        
    }
    return pieces
}
function doMath(pieces) {
    var value 
    var lastOperator 
    for (p in pieces) {
        var piece = pieces[p]
        //Check if number
        if (/^\d+$/.test(piece)) {
            value = sumOrMultiply(value,Number(piece),lastOperator)
            continue
        }
        switch (piece) {
            case ("*"):
                lastOperator = "*"
                break
            case ("+"):
                lastOperator = "+"
                break
            case ("("):
                var part =[]
                var startP = Number(p)
                var p = Number(p)
                p++
                var maxParaCount = 0
                var paraCount = 1
                while(paraCount > 0){
                    if(pieces[p] === "("){
                        paraCount++
                        maxParaCount++
                    }
                    if(pieces[p] === ")"){
                        if(paraCount > 1){
                            part.push(pieces[p])
                            p++
                        }
                        paraCount--
                    } else {
                        part.push(pieces[p])
                        p++
                    }
                }
                pieces.splice(startP,part.length+2,doMath(part).toString()) 
                return doMath(pieces)
                
        }
    }
    return value
}

function sumOrMultiply(num, piece,lastOperator) {
    if(num === undefined || lastOperator === undefined){
        return piece
    }
    if(lastOperator === "*"){
        num *= piece
    } else if(lastOperator === "+") {
        num += piece
    }
    return num
}
// console.log(mathSplit)