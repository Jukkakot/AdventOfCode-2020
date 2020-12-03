var fs = require('fs');
const { format } = require('path');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
function setCharAt(str, index, chr) {
    // console.log(str,index,chr)
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
const puzzle = require("./puzzle.txt")
var puzzleArr = puzzle.split("\r\n")
function checkTreeCount(xStep, yStep, arr, log) {
    var treeCount = 0
    var loopCount = 0
    for (var y = 0; y < arr.length; y += yStep) {
        
        var x = (y/yStep * xStep) - (loopCount * 31)

        if (arr[y][x] === '.') {
            arr.splice(y, 1, setCharAt(arr[y], x, 'O'))
        } else if (arr[y][x] === '#') {
            arr.splice(y, 1, setCharAt(arr[y], x, 'X'))
            treeCount++
        }
        if (x + xStep > arr[y].length - 1) {
            loopCount++
        }
    }
    if (log) {
        console.log(xStep,yStep,arr)
    }
    return treeCount
}
const counts = [
    checkTreeCount(1, 1, [...puzzleArr]),
    checkTreeCount(3, 1, [...puzzleArr]),
    checkTreeCount(5, 1, [...puzzleArr]),
    checkTreeCount(7, 1, [...puzzleArr]),
    checkTreeCount(1, 2, [...puzzleArr],true)
]
for(count of counts){
    console.log("Tree count: ",count)
}
var finalAnswer = 1
counts.forEach(c=>{
    finalAnswer *= c
})
console.log("Final answer: ", finalAnswer)