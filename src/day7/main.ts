import { readFileSync } from "fs";

function readInput(filepath: string): string[][] {
    let file = readFileSync(filepath, 'utf-8')
    return file.split(/\r?\n/).map((x) => x.split(' '))
}

interface file {
    name: string,
    size: number
}

interface directory {
    name: string
    files: file[]
    subdirectories: directory[]
    parent?: directory
}

function constructDirectory(commands: string[][]){
    let currentLocation: directory = {
        name: '/',
        files: [],
        subdirectories: []
    }
    commands.forEach( (x) => {
    if(x[0] == '$'){
        if(x[1] == 'cd'){
            if(x[2] == '..'){
                currentLocation = currentLocation.parent as directory
            } else if(x[2] == '/'){
                currentLocation = goToParent(currentLocation) 

            }
            else{
            currentLocation = currentLocation.subdirectories.filter((y: directory) => y.name == x[2])[0]
            }
        }

    } else {
        if(x[0] == 'dir'){
            currentLocation.subdirectories.push({name: x[1], files: [], subdirectories: [], parent: currentLocation})
        } else {
            currentLocation.files.push({name: x[1], size: Number(x[0])})
        }
    }
}


    )
    return goToParent(currentLocation) 
}

function goToParent(directory: directory): directory {
    let currentDirectory = directory
    while(currentDirectory.parent != undefined){
        currentDirectory = currentDirectory.parent

    }
    return currentDirectory

}

console.log(constructDirectory(readInput('resources/day7/test.txt')))