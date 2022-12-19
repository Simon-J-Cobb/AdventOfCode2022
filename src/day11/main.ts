import { readFileSync } from "fs"

interface operation {
    (x : number) : number
}

interface test {
    (x : number) : number
}
interface monkey {
    id: number
    items: number[],
    operation: operation
    test: test,
    inspecttimes: number,
    divisor: number
}

function readInput(filepath: string): monkey[] {
    let file = readFileSync(filepath, 'utf-8')
    let monkeys = []
    let lines =  file.split(/\r?\n/)
        const chunkSize = 7;
        for (let i = 0; i < lines.length; i += chunkSize) {
            const chunk = lines.slice(i, i + chunkSize);
            monkeys.push(
                {
                    id: Number(chunk[0].split(' ')[1].replace(':','')),
                    items: chunk[1].split(' ').map((x) => parseInt(x.replace(',',''))).filter((x) => !Number.isNaN(x)),
                    operation: operationParser(chunk[2]),
                    test: testParser(chunk.slice(3,7)),
                    divisor: parseInt(chunk[3].split(' ')[5]),
                    inspecttimes: 0
                }
            )

    }
    return monkeys
}

console.log(readInput('resources/day11/test.txt'))

function operationParser(input: string): operation{
    let operations = input.split(' ').slice(-3)
    return function(x :number){
        if(operations[1] == '+'){
            if(operations[2] == 'old'){
                return x + x
            } else{
                return x + parseInt(operations[2])
            }
        } else{
            if(operations[2] == 'old'){
                return x * x
            } else{
                return x * parseInt(operations[2])
            }
        }
    }
}

function testParser(input: string[]): test{
    return function(x:number){
        if(x  % parseInt(input[0].split(' ')[5]) == 0){
            const lineOne = input[1].split(' ')
            return parseInt(lineOne[lineOne.length - 1])
        } else {
            const lineTwo = input[2].split(' ')
            return parseInt(lineTwo[lineTwo.length-1])

        }
    }
    
}

function monkeyRound( monkeys : monkey[]){
    for(let monkey of monkeys){
        for(let item of monkey.items){
            item = monkey.operation(item)
            monkey.inspecttimes += 1
            item = Math.floor(item / 3)
            monkeys[monkey.test(item)].items.push(item)
        }
        monkey.items = []
    }
}

function solutionOne(filepath: string){
    const monkeys = readInput(filepath)
     Array(20).fill([]).forEach(() => monkeyRound(monkeys))
    const newLocal = monkeys.map((x) => x.inspecttimes).sort((x,y) => x - y)
    const maxes = newLocal.slice(-2)
    return maxes.reduce((x,y) => x*y)
}

console.log(solutionOne(('resources/day11/test.txt')))
console.log(solutionOne(('resources/day11/input.txt')))

function monkeyRoundTwo( monkeys : monkey[]){
    let modulus = monkeys.map((x) => x.divisor).reduce((x,y) => x*y)
    for(let monkey of monkeys){
        for(let item of monkey.items){
            item = monkey.operation(item)
            monkey.inspecttimes += 1
            item = item % modulus
            monkeys[monkey.test(item)].items.push(item)
        }
        monkey.items = []
    }
}

function solutionTwo(filepath: string){
    const monkeys = readInput(filepath)
     Array(10000).fill([]).forEach(() => monkeyRoundTwo(monkeys))
    const newLocal = monkeys.map((x) => x.inspecttimes).sort((x,y) => x - y)
    const maxes = newLocal.slice(-2)
    console.log(newLocal)
    return maxes.reduce((x,y) => x*y)
}

console.log(solutionTwo(('resources/day11/test.txt')))