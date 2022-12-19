import { readFileSync } from "fs"

interface instruction {
    direction: string
    amount?: number
}

function readInput(filepath: string): instruction[] {
    let file = readFileSync(filepath, 'utf-8')
    return file.split(/\r?\n/).map((x) => { return { direction: x.split(' ')[0] , amount: Number(x.split(' ')[1]) } })
}

console.log(readInput('resources/day10/test.txt'))

interface computerState{
    x: number,
    cycle: number
}

interface stateAndSum{
    state: computerState,
    sum: number
}

function cycle(state: computerState, instruction: instruction, signalStrengthSum: number): stateAndSum{
    if(instruction.direction == 'noop'){
        state.cycle += 1
        signalStrengthSum += signalStrengthEvery40(state)
        return {state: state, sum: signalStrengthSum}
    } else if(instruction.direction == 'addx'){
        state.cycle += 1
        signalStrengthSum += signalStrengthEvery40(state)
        state.cycle += 1
        signalStrengthSum += signalStrengthEvery40(state)
        state.x += instruction.amount as number
        
    }
    return {state: state, sum: signalStrengthSum}

}

function signalStrengthEvery40(state: computerState){
    if((state.cycle + 20) % 40 == 0){
        return state.cycle * state.x
    } else {
        return 0
    }
}

function solutionOne(filepath:string){
    let instructions = readInput(filepath)
    let stateAndSum = {state: {x:1,cycle:0}, sum:0}
    for(let instruction of instructions){
        stateAndSum = cycle(stateAndSum.state, instruction,stateAndSum.sum)
    }
    return stateAndSum.sum
}

console.log(solutionOne('resources/day10/testTwo.txt'))
console.log(solutionOne('resources/day10/input.txt'))

interface crtPosition{
    row: number,
    column: number
}

function crtPositionAtCycle(computerState: computerState){
    return {row: Math.floor(computerState.cycle / 40) % 6, column: computerState.cycle % 40 }
}

function pixelLights(computer: computerScreen){
    let computerState = computer.state
    let crtPosition = crtPositionAtCycle(computerState)
    //console.log(crtPosition)
    //console.log(computerState.x)
    if(crtPosition.column == computerState.x || crtPosition.column == computerState.x + 1 || crtPosition.column == computerState.x - 1){
        computer.grid[crtPosition.row][crtPosition.column] = '#'
        //console.log(computer.grid[crtPosition.row])
    } else{
        return
    }
}

type pixel =  '#' | '.'

interface computerScreen{
    state: computerState,
    grid: pixel[][]

}

function screencycle(computer: computerScreen, instruction: instruction): computerScreen{
    let state = computer.state
    if(instruction.direction == 'noop'){
        pixelLights(computer)
        state.cycle += 1
        return computer
    } else if(instruction.direction == 'addx'){
        pixelLights(computer)
        state.cycle += 1
        pixelLights(computer)
        state.cycle += 1
        state.x += instruction.amount as number
        
    }
    return computer
}

function solutionTwo(filepath:string){
    let instructions = readInput(filepath)
    let grid: pixel [][] = Array(6).fill([]).map(function(){return Array(40).fill('.')})
    let computer = {state: {x:1,cycle:0}, grid: grid }
    for(let instruction of instructions){
        screencycle(computer,instruction)
    }
    return computer.grid
}
for(let line of solutionTwo('resources/day10/testTwo.txt').map((x
) => x.join(''))){
    console.log(line)
}
