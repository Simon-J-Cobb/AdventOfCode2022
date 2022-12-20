import { COMPARISON_BINARY_OPERATORS } from "@babel/types";
import { readFileSync } from "fs"

interface packet {
    value: number | Array<any>
}

function readInput(filepath: string): packet[][] {
    let file = readFileSync(filepath, 'utf-8')
    let lines = file.split(/\r?\n/)
    const chunkSize = 3;
    let packets = []
    for (let i = 0; i < lines.length; i += chunkSize) {
        packets.push([{ value: JSON.parse(lines[i]) } as packet, { value: JSON.parse(lines[i + 1]) } as packet])

    }
    return packets

}

export function compare(packetOne: packet, packetTwo: packet): -1 | 0 | 1 {
    if (typeof packetOne.value == 'number' && typeof packetTwo.value == 'number') {
        if (packetOne.value < packetTwo.value) {
            return 1
        } else if (packetOne.value == packetTwo.value) {
            return 0
        } else {
            return - 1
        }
    }
    else if (typeof packetOne.value == 'object' && typeof packetTwo.value == 'object') {
        for (let i = 0; i < packetTwo.value.length; i++) {
            if (i >= packetOne.value.length) {
                return 1
            } else {
                let comparison = compare({ value: packetOne.value[i] }, { value: packetTwo.value[i] })
                if (comparison == 0) {
                    continue
                } else {
                    return comparison
                }
            }
        }
        if (packetOne.value.length > packetTwo.value.length) {
            return -1
        } else {
            return 0
        }
    } else if (typeof packetOne.value == 'number' && typeof packetTwo.value == 'object') {
        return compare({ value: [packetOne.value] }, packetTwo)
    }
    else if (typeof packetOne.value == 'object' && typeof packetTwo.value == 'number') {
        return compare(packetOne, { value: [packetTwo.value] })

    } else {
        return 0
    }
}

function solutionOne(filepath: string) {
    let packets = readInput(filepath)
    let i = 1
    let answer = 0
    for (let packet of packets) {
        if (compare(packet[0], packet[1]) > 0) {
            answer += i
        }
        i++
    }
    return answer
}

console.log(solutionOne('resources/day13/test.txt'))
console.log(solutionOne('resources/day13/input.txt'))

function solutionTwo(filepath: string) {
    let packets = readInput(filepath)
    let listOfPackets = packets.flat()
    const dividorOne = { value: [[2]] };
    const dividorTwo = { value: [[6]] };
    listOfPackets.push(dividorOne, dividorTwo)
    listOfPackets.sort((a, b) => compare(b,a))
    const indexone = listOfPackets.indexOf(dividorOne) + 1;
    const indextwo = listOfPackets.indexOf(dividorTwo) + 1;
    return (indexone) * (indextwo)
}

console.log(solutionTwo('resources/day13/test.txt'))
console.log(solutionTwo('resources/day13/input.txt'))



