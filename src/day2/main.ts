import { readFileSync } from "fs";

type opponentStrat = 'A' | 'B' | 'C';

type userStrat = 'X' | 'Y' | 'Z';

interface strategy {
    user: userStrat
    opponent: opponentStrat
}


function readInput(filepath: string): strategy[]{
    let file = readFileSync(filepath,'utf-8')
    return file.split(/\r?\n/).map((input) => {return {user: input.split(' ')[1] as userStrat , opponent: input.split(' ')[0] as opponentStrat}})
}

console.log(readInput('day2/test.txt'))

function score(strategy: strategy): number{
    let score = 0
    if(strategy.user == 'X'){
        score += 1
        if(strategy.opponent == 'A'){
            score+=3
        }
        if(strategy.opponent == 'B'){
            score+=0
        }
        if(strategy.opponent == 'C'){
            score+=6
        }
    }
    else if(strategy.user == 'Y'){
        score += 2
        if(strategy.opponent == 'A'){
            score += 6
        }
        if(strategy.opponent == 'B'){
            score += 3
        }
        if(strategy.opponent == 'C'){
            score += 0
        }
    }
    else if(strategy.user == 'Z'){
        score += 3
        if(strategy.opponent == 'A'){
            score += 0
        }
        if(strategy.opponent == 'B'){
            score += 6
        }
        if(strategy.opponent == 'C'){
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
console.log(solutionOne('day2/input.txt'))

function scorePartTwo(strategy: strategy){
    let score = 0
    if(strategy.user == 'X'){
        score += 0
        if(strategy.opponent == 'A'){
            score+=3
        }
        if(strategy.opponent == 'B'){
            score+=1
        }
        if(strategy.opponent == 'C'){
            score+=2
        }
    }
    else if(strategy.user == 'Y'){
        score += 3
        if(strategy.opponent == 'A'){
            score += 1
        }
        if(strategy.opponent == 'B'){
            score += 2
        }
        if(strategy.opponent == 'C'){
            score += 3
        }
    }
    else if(strategy.user == 'Z'){
        score += 6
        if(strategy.opponent == 'A'){
            score += 2
        }
        if(strategy.opponent == 'B'){
            score += 3
        }
        if(strategy.opponent == 'C'){
            score += 1
        }
    }
    return score

}

function solutionTwo(filepath: string): number{
    let strategies = readInput(filepath)
    return strategies.map(scorePartTwo).reduce((x,y) => x + y)
}

console.log(solutionTwo('day2/test.txt'))
console.log(solutionTwo('day2/input.txt'))