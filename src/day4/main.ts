import { readFileSync } from "fs"



function readInput(filepath: string): number[][][]{
    let file = readFileSync(filepath,'utf-8')
    return file.split(/\r?\n/).map((x => x.split(",").map((y) => y.split("-").map((z) => Number(z)))))
}

console.log(readInput('resources/day4/test.txt'))

function contains( pairs: number[][]): number{
    if(pairs[0][0] 
        >= pairs[1][0] && pairs[0][1] <= pairs[1][1]){
        return 1
    } else if(pairs[0][0] <= pairs[1][0] && pairs[0][1] >= pairs[1][1]){
        return 1
    } else{
        return 0
    }
}

function solutionOne(filepath:string): number {
    return readInput(filepath).map((x) => contains(x)).reduce((x,y) => x + y)
}

console.log(solutionOne('resources/day4/test.txt'))
console.log(solutionOne('resources/day4/input.txt'))

function overlaps(pairs: number[][]){
    if(contains(pairs)){
        return contains(pairs)
    } else{
        if(pairs[1][0] <= pairs[0][0] && pairs[0][0] <= pairs[1][1]){
            return 1
        } else if(pairs[1][0] <= pairs[0][1] && pairs[0][1] <= pairs[1][1]){
            return 1
        } else {
            return 0
        }

    }

}

function solutionTwo(filepath:string): number {
    return readInput(filepath).map((x) => overlaps(x)).reduce((x,y) => x + y)
}

console.log(solutionTwo('resources/day4/test.txt'))
console.log(solutionTwo('resources/day4/input.txt'))


