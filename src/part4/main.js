var fs = require('fs');
const { format } = require('path');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const passTxt = require("./passports.txt")
const passArr = passTxt.split("\r\n")
var p = []
var passports = []
for (var line of passArr) {
    if (line !== "") {
        var lineArr = line.split(" ")
        for (field of lineArr) {
            if (!field.startsWith("cid")) {
                p.push(field.split(":"))
            }
        }
    } else {
        passports.push(p)
        p = []
    }
}
var p1Valids = []
for (p of passports) {
    if (p.length === 7) {
        p1Valids.push(p)
    }
}
var p2Valids = []
for (p of p1Valids) {
    var isValid = true
    for (field of p) {
        const value = field[1]
        switch (field[0]) {
            case "byr":
                // byr (Birth Year) - four digits; at least 1920 and at most 2002.
                if (!(Number(value) >= 1920 && Number(value) <= 2002)) isValid = false; break;
            case "iyr":
                // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
                if (!(Number(value) >= 2010 && Number(value) <= 2020)) isValid = false; break;
            case "eyr":
                // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
                if (!(Number(value) >= 2020 && Number(value) <= 2030)) isValid = false; break;
            case "hgt":
                // hgt (Height) - a number followed by either cm or in:
                // If cm, the number must be at least 150 and at most 193.
                // If in, the number must be at least 59 and at most 76.
                const splitValue = value.split(/([0-9]+)/).filter(Boolean)
                const unit = splitValue[1]
                const number = splitValue[0]
                if (unit) {
                    if (unit === "cm") {
                        if (!(Number(number) >= 150 && Number(number) <= 193)) isValid = false; break;
                    } else if (unit === "in") {
                        if (!(Number(number) >= 59 && Number(number) <= 76)) isValid = false; break;
                    } else isValid = false; break;
                } else isValid = false;
                break;
            case "hcl":
                // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
                if (!value.startsWith("#") || value.length !== 7) isValid = false
                break;
            case "ecl":
                // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
                const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
                if (!eyeColors.includes(value)) isValid = false
                break;
            case "pid":
                // pid (Passport ID) - a nine-digit number, including leading zeroes.
                if (!value.match(/^\d{9}$/))  isValid = false
                break;
            default:
        }
        if (!isValid) {
            break
        }
    }
    if (isValid) {
        p2Valids.push(p)
    }
}
console.log("part1 Valids:", p1Valids.length)
console.log("part2 Valids:", p2Valids.length)
