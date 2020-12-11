var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const seatSplit = require("./seats.txt").split("\r\n")
var prevGrid = []
var currGrid = []
for (line of seatSplit) {
    currGrid.push(line.split("").flat())
}

var wasChanged = true
while (wasChanged) {
    prevGrid = [...currGrid]
    currGrid = []
    wasChanged = doThings()
}

var finalOCount = 0

for (line of currGrid) {
    console.log(line.join(""))
    const counts = line.join('').split('').reduce(function (o, e) {
        return o[e] = (o[e] || 0) + 1, o
    }, {});
    if (!counts["#"]) continue
    finalOCount += counts["#"]
}
console.log("occupied count", finalOCount)



function doThings() {
    var changed = false
    for (var i = 0; i < prevGrid.length; i++) {
        var line = []
        for (var j = 0; j < prevGrid[i].length; j++) {
            var chr = prevGrid[i][j]
            if (chr === ".") {
                line.push(".")
                continue
            }
            
            var oCount = getOCount(j, i)

            if (chr === "L" && oCount === 0) {
                line.push("#")
                changed = true
                continue
            } else if (chr === "#" && oCount >= 5) { //p1 oCount >= 4
                line.push("L")
                changed = true
                continue
            }
            line.push(chr)
        }
        currGrid.push(line)
    }

    return changed
}

function getOCount(x, y) {
    var totalCount = 0
    var n = getDirs(x, y)

    for (coord of n) {
        if (checkDir(x, y, coord) === "#") {
            totalCount++
        }
    }
    return totalCount
}
function checkDir(startX, startY, [yDif, xDif]) {
    var x = startX + xDif
    var y = startY + yDif
    while (true) {
        if (prevGrid[y] === undefined) break
        var char = prevGrid[y][x]
        if (char === undefined) break

        if (char === "L") {
            return "L"
        } else if (char === "#") {
            return "#"
        }
        x += xDif
        y += yDif
    }
    return "."
}

//Used for p1
function getNeighbours(x, y) {
    var neighbours = []
    var maxWidth = prevGrid[y].length
    var maxHeight = prevGrid.length
    //Top
    if (y > 0) {
        neighbours.push([y - 1, x])
        //Top left
        if (x > 0) {
            neighbours.push([y - 1, x - 1])
        }
        //Top right
        if (x + 1 < maxWidth) {
            neighbours.push([y - 1, x + 1])
        }
    }

    //Bottom
    if (y + 1 < maxHeight) {
        neighbours.push([y + 1, x])
        //Bottom left
        if (x > 0) {
            neighbours.push([y + 1, x - 1])
        }
        //Bottom right
        if (x < maxWidth) {
            neighbours.push([y + 1, x + 1])
        }
    }

    //Left
    if (x > 0) {
        neighbours.push([y, x - 1])
    }
    //Right
    if (x < maxWidth) {
        neighbours.push([y, x + 1])
    }
    return neighbours
}

function getDirs(x, y) {
    var neighbours = []
    var maxWidth = prevGrid[y].length
    var maxHeight = prevGrid.length
    //Top
    if (y - 1 >= 0) {
        neighbours.push([-1, 0])
        //Top left
        if (x - 1 >= 0) {
            neighbours.push([-1, -1])
        }
        //Top right
        if (x + 1 < maxWidth) {
            neighbours.push([-1, 1])
        }
    }

    //Bottom
    if (y + 1 < maxHeight) {
        neighbours.push([1, 0])
        //Bottom left
        if (x - 1 >= 0) {
            neighbours.push([1, -1])
        }
        //Bottom right
        if (x + 1 < maxWidth) {
            neighbours.push([1, 1])
        }
    }

    //Left
    if (x - 1 >= 0) {
        neighbours.push([0, -1])
    }
    //Right
    if (x + 1 < maxWidth) {
        neighbours.push([0, 1])
    }
    return neighbours
}