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
