var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const xmasSplit = require("./xmas.txt").split("\r\n")
var index = 25
var xmasArr = [...xmasSplit]
var numToFind
var isFound = true
var numbers
var foundNum
while(isFound) {
    xmasArr.shift()
    numbers = xmasArr.slice(0, index)
    numToFind = Number(xmasArr[index])
    isFound = false
    for (var num1 of numbers) {
        for (var num2 of numbers) {
            if (num1 === num2) continue
            var sum = Number(num1) + Number(num2)
            if (sum === numToFind) {
                isFound = true
                break
            }
        }
        if (isFound) break
    }

    foundNum = xmasArr[index]
}
var foundNIndex = xmasSplit.indexOf(foundNum)
console.log("finished with ", foundNum,foundNIndex)
xmasArr = [...xmasSplit]
var sum
var min = Number(xmasSplit[foundNIndex])
var max = 0
isFound = false
while(!isFound){
    isFound = false
    sum = 0
    min =Number(xmasSplit[foundNIndex])
    max = 0
    for (numStr of xmasArr){
        min = Math.min(min,numStr)
        max = Math.max(max,numStr)

        sum += Number(numStr)
        if(sum > Number(xmasSplit[foundNIndex])) break

        if(sum === Number(xmasSplit[foundNIndex])){
            console.log("sum was:",sum)
            console.log("min",min,"max",max,"sum:",min+max)
            isFound = true
            break
        } 
    }
    xmasArr.shift()
}
