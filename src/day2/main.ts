import { readFileSync } from "fs";

type userStrat = 'A' | 'B' | 'C';

type opponentStrat = 'X' | 'Y' | 'Z';

interface strategy {
    user: userStrat
    opponent: opponentStrat
}


function readInput(filepath: string): strategy[]{
    let file = readFileSync(filepath,'utf-8')
    return file.split(/\r?\n/).map((input) => {return {user: input.split(' ')[0] as userStrat , opponent: input.split(' ')[1] as opponentStrat}})
}

console.log(readInput('day2/test.txt'))

function score(strategy: strategy): number{
    let score = 0
    if(strategy.user == 'A'){
        score += 1
        if(strategy.opponent == 'X'){
            score+=3
        }
        if(strategy.opponent == 'Y'){
            score+=0

        }
        if(strategy.opponent == 'Z'){
            score+=6
        }
    }
    if(strategy.user == 'B'){
        score += 2
        if(strategy.opponent == 'X'){
            score += 6
        }
        if(strategy.opponent == 'Y'){
            score +=3
        }
        if(strategy.opponent == 'Z'){
            score +=6
        }
    }
    if(strategy.user == 'C'){
        score += 3
        if(strategy.opponent == 'X'){
            score += 0
        }
        if(strategy.opponent == 'Y'){
            score +=6
        }
        if(strategy.opponent == 'Z'){
            score += 3
        }
    }
    return score
    
}

function solutionOne(filepath: string): number{
    let strategies = readInput(filepath)
    return strategies.map(score).reduce((x,y) => x + y)
}

console.log(solutionOne('day2/test.txt'))