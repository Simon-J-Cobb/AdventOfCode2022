import { readFileSync } from "fs"

type kind = '#' | '.' | 'o'


function createGrid(): kind[][] {
    return Array(10).fill([]).map(() => Array(510).fill('.'))
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

function setUpGrid(filepath: string): kind[][] {
    return drawAllLines(createGrid(), readInput(filepath))
}

function prettyGrid(grid: kind[][]){
    for(let row of grid){
        console.log(row.join(''))
    }
}

prettyGrid(setUpGrid('resources/day14/test.txt'))


