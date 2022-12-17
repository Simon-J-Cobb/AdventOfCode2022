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

function solutionOne(filepath:string): number {
    return allCommonLetters(readInput(filepath)).map(letterToScore).reduce((x,y) => x + y)
}

console.log(solutionOne('resources/day3/test.txt'))
console.log(solutionOne('resources/day3/input.txt'))

interface group{
    elfOne: string[]
    elfTwo: string[]
    elfThree: string[]
}

function readInputTwo(filepath: string): group[]{
    let file = readFileSync(filepath,'utf-8')
    let elves =  file.split(/\r?\n/)
    let groups = []
    const chunkSize = 3;
    for (let i = 0; i < elves.length; i += chunkSize) {
        const chunk = elves.slice(i, i + chunkSize);
        groups.push(
            {
                elfOne: chunk[0],
                elfTwo: chunk[1],
                elfThree: chunk[2]
            }
        )
    }
    return groups
}

function groupCommonLetter(group: group): string {
    for(let itemOne of [...group.elfOne]){
        for(let itemTwo of [...group.elfTwo]){
            if(itemOne==itemTwo){
                for(let itemThree of [...group.elfThree]){
                    if(itemThree==itemTwo){
                        return itemThree
                    }

                }

            }
    }
}
}

function solutionTwo(filepath:string): number {
    return readInputTwo(filepath).map(groupCommonLetter).map(letterToScore).reduce((x,y) => x + y)
}

console.log(solutionTwo('resources/day3/test.txt'))
console.log(solutionTwo('resources/day3/input.txt'))


