var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const adapterSplit = require("./testAdapters.txt").split("\r\n")
var adapterArr = [...adapterSplit]

adapterArr.push("0")
adapterArr.sort((a, b) => a - b)
var max = Number(adapterArr[adapterArr.length-1])+3
adapterArr.push(String(max))
//Last adapret is always difference of 3
//First adapter difference is first element in the array
//Assuming the chain is valid
var diffAmounts = [Number(adapterArr[0]),0,0]
var diffValues = []
for (var i = 0; i < adapterArr.length - 1; i++) {
    var curr = Number(adapterArr[i])
    var next = Number(adapterArr[i + 1])
    var diff = next - curr
    diffAmounts[diff - 1]++
    diffValues.push(diff)
}
var size = 0
var chunkSizes = []
for (value of diffValues) {
    if (value === 1) {
        size++
    }
    if (value === 3) {
        if(size >= 2){
            console.log("laitetaan",size-1)
            chunkSizes.push(size-1)
            size = 0
        } else [
            size = 0
        ]
        
    }
    

}
console.log(adapterArr, diffAmounts, diffValues)
console.log("p1Answer:", diffAmounts[0] * diffAmounts[2])
console.log("Chunk sizes", chunkSizes)
var total = 1
for(chunk of chunkSizes){
    console.log(chunk)
    switch(chunk){
        case(1):
            total *= 2
            break
        case(2):
            total *= 5
            break
        case(3):
            total *= 15
            break
        default:
        console.log("default")
    }
}
console.log("total",total)