import { readFileSync } from 'fs';


function parseOutput(input: string) : number {
    if(input == ''){
        return -1
    }
    return parseInt(input);
}

function splitBasedOnValue<Type>(values : Array<Type>, splitValue : Type): Array<Array<Type>>{
    let listOfLists: Type[][]  = []
    let list: Array<Type> = []
    values.forEach( (x : Type) => {
        if(x == splitValue){
            listOfLists.push(list)
            list = []
        
        } else{
        list.push(x)
        }
    })
    return listOfLists
    }

function readInput(filepath: string): number[][]{
    let file = readFileSync(filepath,'utf-8')
    let allCalories: number[] = file.split(/\r?\n/).map(parseOutput)
    return splitBasedOnValue(allCalories, -1)
}

console.log(readInput('day1/test.txt'))

function sumCalories(elves: number[][]): number{
    return elves.map(
        (elf: number[]) => 
            elf.reduce((x,y) => x + y)
    ).reduce((x,y) => Math.max(x,y))
}

function solutionOne(path: string): number{
    return sumCalories(readInput(path))
}

console.log(solutionOne('day1/test.txt'))
