import { readFileSync } from "fs";

function solutionOne(datasteam: string): number {
    let characters: string[] = datasteam.split('')

    for (let i = 0; i < characters.length; i++) {
        if(new Set(characters.slice(i,i+4)).size == 4){
            return i+4

        }
      }
    return characters.length

}

console.log(solutionOne('mjqjpqmgbljsphdztnvjfqwrcgsmlb'))
console.log(solutionOne('bvwbjplbgvbhsrlpgdmjqwftvncz'))
console.log(solutionOne('nppdvjthqldpwncqszvftbrmjlhg'))
console.log(solutionOne('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'))
console.log(solutionOne('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'))