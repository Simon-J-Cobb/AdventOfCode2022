import { readFileSync } from "fs"

interface tree {
    height: number,
    visible: boolean
}

function readInput(filepath: string): tree[][] {
    let file = readFileSync(filepath, 'utf-8')
    return file.split(/\r?\n/).map((x) => x.split('').map((y) => { return { height: Number(y), visible: false } }))
}

const directions: direction[] = [ 'up' , 'down' , 'left' , 'right']

type direction = 'up' | 'down' | 'left' | 'right'

function look(trees: tree[][], direction: direction) {
    let tallest = 0
    if (direction == 'right') {
        for (let i = 0; i < trees.length; i++) {
            for (let j = 0; j < trees[0].length; j++) {
                if (j == 0) {
                    trees[i][j].visible = true
                    tallest = trees[i][j].height 
                } else {
                    if (trees[i][j].height > tallest) {
                        trees[i][j].visible = true
                        tallest = trees[i][j].height 
                    } 
                }

            }

        }
    } else if (direction == 'left') {
        for (let i = 0; i < trees.length; i++) {
            for (let j = trees[0].length- 1; j > 0; j--) {
                if (j == trees.length - 1) {
                    trees[i][j].visible = true
                    tallest = trees[i][j].height 
                } else {
                    if (trees[i][j].height > tallest) {
                        trees[i][j].visible = true
                        tallest = trees[i][j].height
                    } 
                }

            }

        }
    } else if (direction == 'down') {
        for (let i = 0; i < trees[0].length; i++) {
            for (let j = 0; j < trees.length; j++) {
                if (j == 0) {
                    trees[j][i].visible = true
                    tallest = trees[j][i].height 
                } else {
                    if (trees[j][i].height > tallest ) {
                        trees[j][i].visible = true
                        tallest = trees[j][i].height
                    } 
                }

            }

        }
    } else if (direction == 'up') {
        for (let i = 0; i < trees[0].length; i++) {
            for (let j = trees.length - 1; j > 0; j--) {
                if (j == trees.length - 1) {
                    trees[j][i].visible = true
                    tallest = trees[j][i].height 
                } else {
                    if (trees[j][i].height > tallest) {
                        trees[j][i].visible = true
                        tallest = trees[j][i].height
                    }
                }

            }

        }
    }
    return trees
}

function solutionOne(filepath: string){
    let trees = readInput(filepath)
    for(let direction of directions){
        look(trees, direction)
    }
    //return trees
    return trees.flat(1).reduce(function(a,y: tree){return a + + y.visible}, 0)
}

//console.log(readInput('resources/day8/test.txt'))
console.log(solutionOne('resources/day8/test.txt'))
console.log(solutionOne('resources/day8/input.txt'))

function lookTwo(trees: tree[][], startRow: number, startColumn: number, direction: direction) {
    let score = 0
    if (direction == 'right') {
            for (let j = startColumn; j < trees[0].length; j++) {
                if (j == startColumn) {
                    score = 0
                } else {
                    score += 1
                    if (trees[startRow][startColumn].height > trees[startRow][j].height) {
                        continue
                    } else{
                        return score 
                    }
                }
            }

        
    } else if (direction == 'left') {
            for (let j = startColumn; j >= 0; j--) {
                if (j == startColumn) {
                    score = 0
                } else {
                    score += 1
                    if (trees[startRow][startColumn].height > trees[startRow][j].height) {
                        continue
                    } else{
                        return score
                    }
                }

            

        }
    } else if (direction == 'down') {
            for (let j = startRow; j < trees.length; j++) {
                if (j == startRow) {
                    score = 0
                } else {
                    score += 1
                    if (trees[startRow][startColumn].height > trees[j][startColumn].height) {
                        continue
                    } else{
                        return score
                    }
                }
            }

        }
     else if (direction == 'up') {
            for (let j = startRow; j >= 0; j--) {
                if (j == startRow) {
                    score = 0

                } else {
                    score += 1
                    if (trees[startRow][startColumn].height > trees[j][startColumn].height) {
                        continue
                    } else{
                        return score
                    }
                }

            }

        }
    
    return score
}

function solutionTwo(filepath: string){
    let trees = readInput(filepath)
    let bestScore = 0

    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[0].length; j++) {
            let score = 1
            //console.log('tree' ,i, j)
            for(let direction of directions){
                score *= lookTwo(trees, i, j, direction)
                //console.log(direction, score)
            }
            //console.log(score)
            if(score > bestScore){
                bestScore = score
            }
        }
    }
    return bestScore
}

console.log(solutionTwo('resources/day8/test.txt'))
console.log(solutionTwo('resources/day8/input.txt'))

