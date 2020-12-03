var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const list = require("./passwords.txt")
const passArr = list.split("\r\n")
const policyPassArr=[]
for(pass of passArr){
    const arr = pass.split(" ")
    arr.splice(0,1,Number(arr[0].split("-")[0]),Number(arr[0].split("-")[1]))
    arr.splice(2,1,arr[2][0])
    policyPassArr.push(arr)
}

//Part1
var part1Answer = 0
var part2Answer = 0
for(line of policyPassArr){
    const i1 = line[0]
    const i2 = line[1]
    const key = line[2]
    const pass = line[3]

    //Part1
    const splits = pass.split(key).length-1
    if(i1 <= splits && i2 >= splits){
        //console.log(min,max, char, pass, splits)
        part1Answer++
    }
    //Part2
    const char1 = pass[i1-1]
    const char2 = pass[i2-1]
    if(char1 !== char2 && (char1 === key || char2 === key)){
        //console.log(i1,char1,i2,char2, key, pass)
        part2Answer++
    }
}
console.log("part1 count: ",part1Answer)
console.log("part2 count: ",part2Answer)

