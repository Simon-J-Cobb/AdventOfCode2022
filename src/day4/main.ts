import { readFileSync } from "fs"



function readInput(filepath: string): number[][][]{
    let file = readFileSync(filepath,'utf-8')
    return file.split(/\r?\n/).map((x => x.split(",").map((y) => y.split("-").map((z) => Number(z)))))
}

console.log(readInput('resources/day4/test.txt'))
