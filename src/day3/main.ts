import { readFileSync } from "fs"

interface rucksack{
    compartmentOne: string
    compartmentTwo: string

}

function readInput(filepath: string): rucksack[]{
    let file = readFileSync(filepath,'utf-8')
    return file.split(/\r?\n/).map((input) => {return {compartmentOne: input.slice(0,input.length / 2) , compartmentTwo: input.slice(input.length / 2, input.length)}})
}

console.log(readInput('resources/day3/test.txt'))

function commonLetter(rucksack: rucksack): string {
    for(let itemOne of [...rucksack.compartmentOne]){
        for(let itemTwo of [...rucksack.compartmentTwo]){
            if(itemOne==itemTwo){
                return itemOne
            }
    }
}
}

function allCommonLetters(rucksacks: rucksack[]){
    return rucksacks.map(commonLetter)
}

function letterToScore(char: string): number{
    if(char == char.toUpperCase()){
        return char.charCodeAt(0) - 38
    } else{
    return char.charCodeAt(0) - 96
    }
}

console.log(allCommonLetters(readInput('resources/day3/test.txt')))


console.log(letterToScore('a'))
console.log(letterToScore('z'))
console.log(letterToScore('A'))
console.log(letterToScore('Z'))

