var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const cubesSplit = require("./cubes.txt").split("\r\n")

var space = []
var slice = []
cubesSplit.forEach(line => { slice.push(line.split("")) })
space.push(slice)
space = expand(space)
size = space[0].length
var loopCount = 0
var newSpace = getNewSpace(size + 2)
while (loopCount < 6) {
    for (var z in space) {
        for (var y in space[z]) {
            for (var x in space[z][y]) {
                z = Number(z)
                y = Number(y)
                x = Number(x)
                var aCount = getActiveNeighbours(x, y, z).length;
                // console.log(getActiveNeighbours(x, y, z).length, z, y, x, space[z][y][x])
                if (space[z][y][x] === "#" && (aCount === 2 || aCount === 3)) {
                    newSpace[z][y][x] = "#"
                } else if (space[z][y][x] === "." && aCount === 3) {
                    newSpace[z][y][x] = "#"
                }
            }
        }
    }
    loopCount++
    space = expand(newSpace)
    size = space.length
    newSpace = getNewSpace(size + 2)
}
function expand(space) {
    for (var z in space) {
        for (var y in space[z]) {
            space[z][y].unshift(".")
            space[z][y].push(".")
        }
        var size = space[0][0].length
        space[z].push(getNewLine(size))
        space[z].unshift(getNewLine(size))
    }
    var size = space[0].length
    space.unshift(getNewSlice(size))
    space.push(getNewSlice(size))
    return space
}


function getActiveNeighbours(cX, cY, cZ) {
    var neighbours = []
    for (var z = cZ - 1; z < cZ + 2; z++) {
        if (space[z] === undefined) continue
        for (var y = cY - 1; y < cY + 2; y++) {
            if (space[z][y] === undefined) continue
            for (var x = cX - 1; x < cX + 2; x++) {
                if (space[z][y][x] === undefined || x === cX && y === cY && z === cZ) continue
                if (space[z][y][x] === "#") {
                    neighbours.push(space[z][y][x])
                }
            }
        }
    }
    return neighbours
}

function getNewLine(size) {
    var line = []
    for (var j = 0; j < size; j++) {
        line.push(".")
    }
    return line
}

function getNewSlice(size) {
    var slice = []
    for (var i = 0; i < size; i++) {
        slice.push(getNewLine(size))
    }
    return slice
}

function getNewSpace(size) {
    var tempSpace = []
    for (var i = 0; i < size; i++) {
        tempSpace.push(getNewSlice(size))
    }
    return tempSpace
}
function getActiveCount(space) {
    var count = 0
    for (var z in space) {
        for (var y in space[z]) {
            for (var x in space[z][y]) {
                if (space[z][y][x] === "#") {
                    count++
                }
            }
        }
    }
    return count
}
console.log("p1 answer:", getActiveCount(space))