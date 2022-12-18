import { readFileSync } from "fs";

function readStacks(filepath: string): string[][] {
    let file = readFileSync(filepath, 'utf-8')
    let rows = file.split(/\r?\n/)
    const chunkSize = 4;
    let stacks: string[][] = Array.from(Array((rows[0].length + 1) / 4), () => [])
    for (let row of rows.slice(0, rows.length - 1)) {
        for (let i = 0; i < row.length; i += chunkSize) {
            const newLocal = row.slice(i, i + chunkSize).trim();
            if(newLocal == ''){
                continue
            }
            stacks[i / 4].push(newLocal)

        }
    } 
    return stacks

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

function move(instruction : instruction, stacks: string[][]){
    Array(instruction.amount).fill([]).map(() => stacks[instruction.end -1].unshift(stacks[instruction.start - 1].shift() as string))
    //console.log(stacks)
    return stacks
    
}

function solutionOne(stackfilepath: string, instructionfilePath: string): string{
    let stacks = readStacks(stackfilepath)
    let instructions = readInstructions(instructionfilePath)
    instructions.map((x) => move(x, stacks))
    return stacks.map((x) => x[0]).reduce((x,y) => x.replace('[', '').replace(']', '') + y.replace('[', '').replace(']', ''))
}

console.log(solutionOne('resources/day5/testStacks.txt','resources/day5/testInstructions.txt'))
console.log(solutionOne('resources/day5/stacks.txt','resources/day5/instructions.txt'))

