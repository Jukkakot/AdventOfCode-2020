var fs = require('fs');
const { off } = require('process');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const busSplit = require("./testBus.txt").split("\r\n")
// var values = []
var time = Number(busSplit[0])
var newTime = 0
var newValue = 0
while (newTime === 0) {
    for (v of busSplit[1].split(",")) {
        if (v === "x") continue
        // values.push(Number(v))
        var value = Number(v)
        if (time % value === 0) {
            newTime = time
            newValue = value
            console.log("p1 ans", (time - busSplit[0]) * value)
            break
        }
    }
    time++
}
time = Number(busSplit[0])
var foundTime = 0
var values = busSplit[1].split(",")
var loopCount = 0
while (foundTime === 0) {
    var value = Number(values[0])
    if (time % value === 0 && time % Number(values[1]) === 0) {
        foundTime = time
        loopCount++
        break
    }
    loopCount++
    time++
}
console.log("loopcount",loopCount)
// foundTime = 2703100000000 * 37
console.log("foundtime", foundTime, "number", Number(values[0]))
// var origFoundTime = foundTime
var isFound = false
// foundTime++
var firstNumber = values.shift()
// console.log(values)
var bestPatternFound = [firstNumber]
while (true) {
    if(foundTime % 1000000 === 0){
        console.log("round",foundTime)
        console.log("best pattern found",bestPatternFound)
    }
        isFound = true
        var compTime = foundTime +1
    for (v of values) {
       
        var value = Number(v)
        // if (v === values[0]) continue
        if (compTime % value === 0 || v == "x") {
            compTime++
            // console.log(v)
            if(v === "23"){
                console.log(v)
            }
            if(!bestPatternFound.includes(v)){
                bestPatternFound.push(v)
            }
            continue
            // console.log("p2 ans",(time - busSplit[0]) * value)
        } else {
            isFound = false
            break
        }
    }
    if(isFound){
        console.log("p2 ans",foundTime)
        break
    }
    foundTime += Number(firstNumber)
//    foundTime = Math.pow(foundTime,Number(firstNumber))
    // foundTime++
}
// console.log("found time", foundTime)

for(v of busSplit[1].split(",")){
    if(v === "x") {
        foundTime++
        continue
    }
    console.log(foundTime % Number(v) === 0)
    foundTime++
}
//100044633000000