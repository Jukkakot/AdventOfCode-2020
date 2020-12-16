var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
function count(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}
Array.range = function (a, b, step) {
    var A = [];
    if (typeof a == 'number') {
        A[0] = a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length] = a += step;
        }
    }
    else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }
        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        A = s.split('');
    }
    return A;
}
const ticketSplit = require("./tickets.txt").split("\r\n")
var parts = []
var part = []
for (line of ticketSplit) {
    if (line !== "") {
        part.push(line)
    } else {
        parts.push(part)
        part = []
    }
}
var rules = {}
for (part of parts[0]) {
    part = part.replace(/\s/g, '')
    var splitPart = part.split(":")
    var id = splitPart[0]
    var numbers = []
    for (range of splitPart[1].split("or")) {
        var values = range.split("-")
        var min = Number(values[0])
        var max = Number(values[1])
        numbers.push(Array.range(min, max))
    }
    rules[id] = numbers.flat()
}
parts[2].shift()
var inValidNums = []
var tempPart2 = []
for (ticket of parts[2]) {
    var isValidTicket = true
    for (num of ticket.split(",")) {
        var isValid = false
        for (id in rules) {
            if (rules[id].includes(Number(num))) {
                isValid = true
                break
            }
        }
        if (!isValid) {
            inValidNums.push(Number(num))
            isValidTicket = false
        }
    }
    if (isValidTicket) {
        tempPart2.push(ticket.split(","))
    }
}
parts[2] = tempPart2
var possibleRules = {}
parts[2].push(parts[1][1].split(","))
for (var x = 0; x < parts[2][0].length; x++) {
    possibleRules[x] = []
    for (ticket of parts[2]) {
        // var tempRules = []
        var num = Number(ticket[x])
        for (id in rules) {
            if (rules[id].includes(num)) {
                possibleRules[x].push(id)
            }
        }
    }
    possibleRules[x] = count(possibleRules[x])
}
var length = parts[2].length
var possibleClasses = []
for(id1 in possibleRules){
    for(id2 in possibleRules[id1]){
        var tempRules = []
        if(possibleRules[id1][id2] !== length){
            delete possibleRules[id1][id2]
        }
    }
    possibleRules[id1] = Object.keys(possibleRules[id1])
    possibleClasses.push([Object.values(possibleRules[id1]),Number(id1)])
   
}
possibleClasses = possibleClasses.sort(function (a, b) {
    return a[0].length - b[0].length;
  })
var finalRules = {}
for(line of possibleClasses){
    if(line[0].length === 1){
        var rule = line[0][0]
        finalRules[rule] = line[1]
        for(line of possibleClasses){
            line[0].splice(line[0].indexOf(rule),1)
        }
    }
}
const wantedClasses = [
"departurelocation",
"departurestation",
"departureplatform",
"departuretrack",
"departuredate",
"departuretime"
]
var multiply = 1
var myTicket = parts[1][1].split(",")
for(c of wantedClasses) {
    multiply *= Number(myTicket[finalRules[c]])
}
console.log("P2 order of classes",finalRules)
console.log("P1 answer:", inValidNums.reduce((a, b) => a + b, 0))
console.log("P2 answer:",multiply)