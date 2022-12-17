import { readFileSync } from "fs";

function readStacks(filepath: string): string[][] {
    let file = readFileSync(filepath, 'utf-8')
    let rows = file.split(/\r?\n/)
    const chunkSize = 4;
    let stacks: string[][] = Array.from(Array((rows[0].length + 1) / 4), () => [])
    for (let row of rows.slice(0, rows.length - 1)) {
        for (let i = 0; i < row.length; i += chunkSize) {
            stacks[i / 4].push(row.slice(i, i + chunkSize).trim())

        }
    } return stacks

}

interface instruction {
    start: number,
    amount: number,
    end: number
}

function readInstructions(filepath: string): instruction[] {
    let file = readFileSync(filepath, 'utf-8')
    let rows = file.split(/\r?\n/)
    let instructions = []
    for (let row of rows) {
        instructions.push(
        {
            amount: Number(row.split(' ')[1]),
            start: Number(row.split(' ')[3]),
            end: Number(row.split(' ')[5])

        })
    }
    return instructions


}
console.log(readStacks('resources/day5/testStacks.txt'))
console.log(readInstructions('resources/day5/testInstructions.txt'))