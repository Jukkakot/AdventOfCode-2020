var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const maskSplit = require("./masks.txt").split("\r\n")
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
var p2Memory = {}
var p1Memory = {}
var mask
for (line of maskSplit) {
    var command = line.substring(0, 4)
    var splitLine = line.split(" = ")
    if (command === "mask") {
        mask = splitLine[1]
        // console.log(mask)
        continue
    } else if (command === "mem[") {
        var memAdd = Number(splitLine[0].split("[")[1].slice(0, -1))
        var memBit = memAdd.toString(2)
        memBit = addZeros(memBit)

        var valueBit = Number(splitLine[1]).toString(2)
        valueBit = addZeros(valueBit);
        //Merges the bits with current mask
        valueBit = p1Merge(valueBit);
        memBit = p2Merge(memBit)

        var p2Variations = getVariations(memBit)

        var p1Value = parseInt(valueBit, 2)
        p1Memory[memAdd] = p1Value

        for (v of p2Variations) {
            var a = parseInt(v, 2)
            p2Memory[a] = Number(splitLine[1])
        }
    } else {
        console.log("wtf?")
        break
    }
}

var p1Sum = 0
for (var key in p1Memory) {
    p1Sum += p1Memory[key]
}
var p2Sum = 0
for (var key in p2Memory) {
    p2Sum += p2Memory[key]
}
// console.log("p1 memory", p1Memory)
// console.log("p2 memory", p2Memory)
console.log("p1 sum:", p1Sum)
console.log("p2 sum:", p2Sum)


function p1Merge(valueBit) {
    for (var i = mask.length - 1; i >= 0; i--) {
        if (mask[i] !== "X") {
            valueBit = setCharAt(valueBit, i, mask[i]);
        }
    }
    return valueBit
}
function p2Merge(memBit) {
    for (var i = mask.length - 1; i >= 0; i--) {
        if (mask[i] === "X" || mask[i] === "1") {
            memBit = setCharAt(memBit, i, mask[i]);
        }
    }
    return memBit
}
function addZeros(num) {
    var zeros = "";
    for (var i = 0; i < 36 - num.length; i++) {
        zeros += "0";
    }
    return zeros.concat(num);
}
function adddCustomZeros(num, count) {
    var zeros = "";
    for (var i = 0; i < count - num.length; i++) {
        zeros += "0";
    }
    return zeros.concat(num);
}
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
function getVariations(address) {
    var xDecimalCount = 0
    for (char of address) {
        if (char === "X") {
            xDecimalCount++
        }
    }
    if (xCount === 0) return []
    var xCount = Math.pow(2, xDecimalCount)
    var numbers = []

    for (var i = 0; i < xCount; i++) {
        numbers.push(adddCustomZeros(i.toString(2), xDecimalCount))
    }

    var variations = []
    for (num of numbers) {
        var copyAdd = address
        var count = num.length - 1
        for (var index = 0; index < copyAdd.length; index++) {
            if (copyAdd[index] === "X") {
                copyAdd = copyAdd.replaceAt(index, num[count])
                count--
                if (count < 0) {
                    variations.push(copyAdd)
                    break
                }
            }
        }
    }
    return variations
}