var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const coordsSplit = require("./coords.txt").split("\r\n")

const Dirs = { north: 0, east: 1, south: 2, west: 3 }
var x = 0
var y = 0
var wayX = 10
var wayY = 1
var dir = Dirs.east
for (coord of coordsSplit) {
    var action = coord[0]
    var value = Number(coord.slice(1))
    
    switch (action) {
        case ("N"):
            wayY += value
            break
        case ("S"):
            wayY -= value
            break
        case ("E"):
            wayX += value
            break
        case ("W"):
            wayX -= value
            break
        case ("L"):
            //p1 handling
            // dir = (dir - turnAmount) % 4
            // if (dir < 0) {
            //     dir += 4
            // }
            var turnAmount = Math.floor(value / 90)
            while (turnAmount > 0) {
                var relativeX = wayX - x
                var relativeY = wayY - y
                wayY = x + relativeX
                wayX = -(y + relativeY)
                turnAmount--
            }

            break
        case ("R"):
            var turnAmount = Math.floor(value / 90)
            while (turnAmount > 0) {
                var relativeX = wayX - x
                var relativeY = wayY - y
                wayY = -(x + relativeX)
                wayX = y + relativeY
                turnAmount--
            }
            //p1 handling
            // dir = (dir + turnAmount) % 4

            break
        case ("F"):
            y += value * wayY
            x += value * wayX
            //p1 handling
            // if (dir === Dirs.north) {
            //     y += value *wayY
            //     x += value *wayX
            // } else if (dir === Dirs.south) {
            //     y -= value
            // } else if (dir === Dirs.east) {
            //     x += value
            // } else if (dir === Dirs.west) {
            //     x -= value
            // } else {
            //     console.log("wtf??")
            //     return
            // }
            break
        default:
            console.log("wtf??")
            return
    }
    // console.log("boat", x, y, dir)
    // console.log("waypoint", wayX, wayY)
}
console.log("final location and direction(p1)",x, y, dir)
console.log("Manhatan discance", Math.abs(x) + Math.abs(y))
