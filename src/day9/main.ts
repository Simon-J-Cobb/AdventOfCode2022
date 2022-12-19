import { readFileSync } from "fs"

type direction = 'R' | 'L' | 'U' | 'D'

interface instruction {
    direction: direction
    amount: number
}

function readInput(filepath: string): instruction[] {
    let file = readFileSync(filepath, 'utf-8')
    return file.split(/\r?\n/).map((x) => { return { direction: x.split(' ')[0] as direction, amount: Number(x.split(' ')[1]) } })
}

interface position {
    xcoord: number,
    ycoord: number,
    kind: 'H' | 'T' | number
}

function directionMove(position: position, direction: direction): position {
    if (direction == 'U') {
        position.ycoord += 1
    } else if (direction == 'D') {
        position.ycoord -= 1
    } else if (direction == 'L') {
        position.xcoord -= 1
    } else if (direction == 'R') {
        position.xcoord += 1
    }
    return position

}

function tMove(hPosition: position, tPosition: position) {
    let xdiff = hPosition.xcoord - tPosition.xcoord
    let ydiff = hPosition.ycoord - tPosition.ycoord
    if (Math.abs(xdiff) == 2 && ydiff == 0) {
        tPosition.xcoord += Math.sign(xdiff) * 1
        return tPosition
    } else if (Math.abs(ydiff) == 2 && xdiff == 0) {
        tPosition.ycoord += Math.sign(ydiff) * 1
        return tPosition
    } else if ((Math.abs(xdiff) == 2 && Math.abs(ydiff) >= 1) || (Math.abs(ydiff) == 2 && Math.abs(xdiff) >= 1)) {
        tPosition.xcoord += Math.sign(xdiff) * 1
        tPosition.ycoord += Math.sign(ydiff) * 1
        return tPosition
    } else {
        return tPosition
    }
}


function move(hPosition: position, tPosition: position, instructions: instruction[]) {
    let positionsVisited = new Set<string>()
    for (let instruction of instructions) {
        for (let i of Array(instruction.amount).fill([])) {
            hPosition = directionMove(hPosition, instruction.direction)
            tPosition = tMove(hPosition, tPosition)
            positionsVisited.add(JSON.stringify(tPosition))
        }
    }
    return positionsVisited
}

function solutionOne(filepath:string){
    return move({xcoord: 0, ycoord: 0, kind: 'H'},{xcoord: 0, ycoord: 0, kind: 'T'}, readInput(filepath)).size
}
console.log(readInput('resources/day9/test.txt'))
console.log(solutionOne('resources/day9/test.txt'))
console.log(solutionOne('resources/day9/input.txt'))

function longmove(positions: position[], instructions: instruction[]) {
    let positionsVisited = new Set<string>()
    for (let instruction of instructions) {
        for (let i of Array(instruction.amount).fill([])) {
            positions[0] = directionMove(positions[0], instruction.direction)
            for(let j = 1;j < positions.length; j++){
                positions[j] = tMove(positions[j-1],positions[j])
            }
            positionsVisited.add(JSON.stringify(positions[9]))
        }
    }
    return positionsVisited
}

function solutionTwo(filepath:string){
    let positions = []
    for(let i=0;i < 10;i++){
        positions.push({xcoord: 0, ycoord: 0, kind: i})

    }
    return longmove(positions, readInput(filepath)).size
}
console.log(solutionTwo('resources/day9/test.txt'))
console.log(solutionTwo('resources/day9/testTwo.txt'))
console.log(solutionTwo('resources/day9/input.txt'))


