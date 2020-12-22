var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const rulesSplit = require("./testRules.txt").split("\r\n")
var rules = {}
var hadEmptyLine = false
var texts = []
for (line of rulesSplit) {
    if(line === ""){
        hadEmptyLine = true
        continue
    }
    if(!hadEmptyLine){
        var lineSplit = line.split(": ")
        var numb = lineSplit[0]
        var parts = lineSplit[1].split(" ")
        var r = []
        var rPart = []
        for(p of parts) {
            if(/^\d+$/.test(p)){
                //Was number
                // console.log("number",p)
                rPart.push(p)
            } else if(p === "|") {
                // console.log("pipe",p)
                r.push(rPart)
                rPart = []
            } else if (p.length > 2) {
                // console.log("letter",p)
                rPart.push(p[1])
            }
        }
        r.push(rPart)
        rules[numb] = r
    } else {
        texts.push(line.split(""))
    }
   
}

function constructRules(parts){
    var strings = []
    var partString = []
    for(part of parts){
        strings.push(" | ")
        for(p of part){
            if(/^\d+$/.test(p)){
            //   partString.push(constructRules(rules[p]))
            strings.push(constructRules(rules[p]))
            } else {
                return p
            }
            
        }
        
    }
    // console.log(parts)
    return strings
    // strings.push(partString)
    // return strings
}
console.log(rules)
console.log(constructRules(rules[0]).join(""))
// console.log(texts)

// A AA AB B