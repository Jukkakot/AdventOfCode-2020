Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};
//Real numbers
const numbers = [6,19,0,5,7,13,1]
//Test numbers
// var numbers = [0,3,6]
while(numbers.length < 2020){
    var lastIndex = numbers.length-1
    var lastNumber = numbers[lastIndex]
    var multiIndexes = numbers.multiIndexOf(lastNumber)
    if(multiIndexes.length > 1){
        var index = multiIndexes[multiIndexes.length-2]
        var diff = lastIndex - index
        numbers.push(diff)
    } else {
        numbers.push(0)
    }
}
console.log(numbers)
console.log("numb lenght",numbers.length)
console.log("p1 ans",numbers[numbers.length-1])