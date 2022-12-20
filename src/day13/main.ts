import { readFileSync } from "fs"

interface packet {
    value: number | Array<any>
}

function readInput(filepath: string): packet[][]{
    let file = readFileSync(filepath, 'utf-8')
    let lines = file.split(/\r?\n/)
    const chunkSize = 3;
    let packets = []
    for (let i = 0; i < lines.length; i += chunkSize) {
        packets.push([{value: JSON.parse(lines[i])} as packet,{value: JSON.parse(lines[i+1])} as packet])

    }
    return packets
    
}

export function compare(packetOne: packet, packetTwo: packet): boolean {
    if (typeof packetOne.value == 'number' && typeof packetTwo.value == 'number') {
        return packetOne.value < packetTwo.value
    }
    else if (typeof packetOne.value == 'object' && typeof packetTwo.value == 'object') {
        for (let i = 0; i < packetTwo.value.length; i++) {
            if (i >= packetOne.value.length) {
                return true
            } else {
                if (JSON.stringify(packetOne.value[i]) === JSON.stringify(packetTwo.value[i])) {
                    continue
                }
                return compare({ value: packetOne.value[i] }, { value: packetTwo.value[i] })
            }
        }
    } else if (typeof packetOne.value == 'number' && typeof packetTwo.value == 'object') {
        return compare({ value: [packetOne.value] }, packetTwo)
    }
    else if (typeof packetOne.value == 'object' && typeof packetTwo.value == 'number') {
        return compare(packetOne, { value: [packetTwo.value] })

    } else{
        return false
    }
    return false

}

function solutionOne(filepath:string){
    let packets = readInput(filepath)
    let i = 1
    let answer = 0
    for(let packet of packets){
        if(compare(packet[0],packet[1])){
            answer += i
        }
        i++
    }
    return answer
}

console.log(solutionOne('resources/day13/test.txt'))

