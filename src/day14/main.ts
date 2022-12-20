import { readFileSync } from "fs"

type kind = '#' | '.' | 'o'


function createGrid(width: number, height: number): kind[][] {
    return Array(width + 3).fill([]).map(() => Array(height + 2).fill('.'))
}

function drawLine(start: number[], end: number[], grid: kind[][]) {

    if (start[1] == end[1]) {
        const lower = start[0] > end[0] ? end[0] : start[0]
        const higher = start[0] > end[0] ? start[0] : end[0]
        for (let i = lower; i <= higher; i++) {
            grid[start[1]][i] = '#'
        }
    } else if (start[0] == end[0]) {
        const lower = start[1] > end[1] ? end[1] : start[1]
        const higher = start[1] > end[1] ? start[1] : end[1]
        for (let i = lower; i <= higher; i++) {
            grid[i][start[0]] = '#'
        }
    }

}

function readInput(filepath: string) {
    let file = readFileSync(filepath, 'utf-8')
    return file.split(/\r?\n/).map((x) => x.split(' -> ').map((y) => y.split(',').map(parseFloat)))
}

console.log(readInput('resources/day14/test.txt'))

function drawAllLines(grid: kind[][], lines: number[][][] ){

    for(let row of lines){
        for(let i = 0; i < row.length - 1; i++){
            drawLine(row[i], row[i+1], grid)

        }
    }

    return grid

}

interface grid {
    value: kind[][]
    maxrow: number
}

function setUpGrid(filepath: string): grid {
    const input = readInput(filepath)
    let height = Math.max(...input.flat().map((x) => x[1])) 
    let row = 1000 
    return {value: drawAllLines(createGrid(height, row), input), maxrow: height }
}

function prettyGrid(grid: kind[][]){
    for(let row of grid){
        console.log(row.join(''))
    }
}

prettyGrid(setUpGrid('resources/day14/test.txt').value)

function fallingSand(gridwithrow:grid){
    let row = 0
    let column = 500
    let grid = gridwithrow.value
    while(true){
        if(row >= gridwithrow.maxrow + 1){
            return true
        }
        if(grid[row + 1][column] == '.'){
            row += 1
        } else if(grid[row + 1][column - 1] == '.'){
            row += 1
            column -= 1
        } else if(grid[row + 1][column + 1] == '.'){
            row += 1
            column += 1
        } else {
            grid[row][column] = 'o'
            return false
        }


    }
    
}

function solutionOne(filepath: string){
    let grid = setUpGrid(filepath)
    let i = 0
    while(!fallingSand(grid)){
        i++
    }
    //prettyGrid(grid.value)
    return i

}

console.log(solutionOne('resources/day14/test.txt'))
console.log(solutionOne('resources/day14/input.txt'))


function fallingSandPartTwo(gridwithrow:grid){
    let row = 0
    let column = 500
    let grid = gridwithrow.value
    drawLine([0,gridwithrow.maxrow + 2], [999,gridwithrow.maxrow + 2], grid)
    while(true){
        if(grid[0][500] == 'o'){
            return true
        }
        if(grid[row + 1][column] == '.'){
            row += 1
        } else if(grid[row + 1][column - 1] == '.'){
            row += 1
            column -= 1
        } else if(grid[row + 1][column + 1] == '.'){
            row += 1
            column += 1
        } else {
            grid[row][column] = 'o'
            return false
        }


    }
    
}

function solutionTwo(filepath: string){
    let grid = setUpGrid(filepath)
    let i = 0
    while(!fallingSandPartTwo(grid)){
        i++
    }
    //prettyGrid(grid.value)
    return i

}

console.log(solutionTwo('resources/day14/test.txt'))
