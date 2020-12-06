var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const ansSplit = require("./answers.txt").split("\r\n")
var a = []
var p1Counts = []
var p2Counts = []

for (var line of ansSplit) {
    if (line !== "") {
        a.push(line)
    } else {
        var group = a.join(",")
        p1Counts.push(uniqChars(group).length)
        a = []
        //P2
        group = group.split(",")
        if (group.length === 1) {
            p2Counts.push(group[0].length)
            //console.log("\nGROUP:", group, group[0].length)
            continue
        }
        var sameAns = ""
        for (person of group) {
            for (char of person) {
                var wasInAll = true
                for (person of group) {
                    if (!person.includes(char)) {
                        wasInAll = false
                        break
                    }
                }
                if (wasInAll && !sameAns.includes(char)) {
                    sameAns += char
                }
            }
        }
        p2Counts.push(uniqChars(sameAns).length)
        //console.log("\nGROUP:", group, "\nSAME ANSWERS:",sameAns, uniqChars(sameAns).length)
    }
}
function uniqChars(str) {
    var uniql = "";
    for (var x = 0; x < str.length; x++) {
        if (str.charAt(x) === ",") continue
        if (uniql.indexOf(str.charAt(x)) == -1) {
            uniql += str[x];
        }
    }
    return uniql;
}
console.log("Part1 sum:", p1Counts.reduce((a, b) => a + b, 0))
console.log("Part2 sum:", p2Counts.reduce((a, b) => a + b, 0))
