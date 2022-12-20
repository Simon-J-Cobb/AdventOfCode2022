import { mainModule } from "process"

interface packet{
    value : number | Array<Number>
}

export function compare(packetOne: packet, packetTwo: packet){
    if(typeof packetOne.value == 'number' && typeof packetTwo.value == 'number'){
        return packetOne.value < packetTwo.value
    }
}

