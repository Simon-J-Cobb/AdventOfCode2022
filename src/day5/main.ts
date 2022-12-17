import { readFileSync } from "fs";

function readStacks(filepath:string): string[][]{
    let file = readFileSync(filepath,'utf-8')
    let rows =  file.split(/\r?\n/)
    const chunkSize = 4;
    let stacks: string[][] = Array.from(Array((rows[0].length + 1 )/ 4),() => [])
    for(let row of rows.slice(0, rows.length - 1)){
        for (let i = 0; i < row.length; i += chunkSize) {
            stacks[i / 4].push(row.slice(i, i + chunkSize).trim())

} }   return stacks

    }

console.log(readStacks('resources/day5/stacks.txt'))