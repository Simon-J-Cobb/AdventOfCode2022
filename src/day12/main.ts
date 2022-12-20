import { readFileSync } from "fs"

interface node {
    value: string
    connectedNodes: node[]
    distance: number
    visited: boolean
}



function readInput(filepath: string): node[] {
    let file = readFileSync(filepath, 'utf-8')
    let nodes = file.split(/\r?\n/).map((x) => x.split('').map((y) => { return { value: y, connectedNodes: Array<node>(0), distance: 0, visited: false } }))
    connectGraph(nodes)
    return nodes.flat()

}

function connectGraph(graph: node[][]) {
    let height = graph.length
    let width = graph[0].length
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            reachable(graph[i][j], getNode(graph, i - 1, j))
            reachable(graph[i][j], getNode(graph, i + 1, j))
            reachable(graph[i][j], getNode(graph, i, j - 1))
            reachable(graph[i][j], getNode(graph, i, j + 1))
        }
    }
}

function getNode(graph: node[][], column: number, row: number) {
    try {
        return graph[column][row]
    } catch (e) {
        return undefined
    }
}

function reachable(start: node, end: node | undefined) {
    if (typeof end == 'undefined') {
        return
    }
    if ((end.value.replace('S', 'a').replace('E', 'z').charCodeAt(0) - start.value.replace('S', 'a').replace('E', 'z').charCodeAt(0) < 2)) {
        start.connectedNodes.push(end)
    } else {
        return
    }

}

function Dijkstra(graph: node[], startNode: node) {
    let current = graph[0]
    for (let node of graph) {
        if (node == startNode) {
            node.distance = 0
            node.visited = false
            current = node
        } else {
            node.distance = Infinity
            node.visited = false

        }
    }
    while (true) {
        for (let node of current.connectedNodes) {
            if (node.visited) {
                continue
            }
            let tentativeDist = current.distance + 1

            if (tentativeDist < node.distance) {
                node.distance = tentativeDist
            }

        }
        current.visited = true
        if (current.value == 'E') {
            return current.distance
        }
        current = graph.filter((x) => !x.visited).reduce(function (x, y) { return (x && x.distance < y.distance) ? x : y; })
        if(current.distance == Infinity){
            return Infinity
        }
    }
}

function solutionOne(filepath: string) {
    let graph = readInput(filepath)
    let startnode = graph.filter((x) => x.value == 'S')[0]
    return Dijkstra(graph, startnode)
}

console.log(readInput('resources/day12/test.txt'))
console.log(solutionOne('resources/day12/test.txt'))
console.log(solutionOne('resources/day12/input.txt'))

function solutionTwo(filepath: string) {
    let graph = readInput(filepath)
    let startnodes = graph.filter((x) => x.value == 'a' || x.value == 'S')
    let distances = []
    for (let node of startnodes) {
        distances.push(Dijkstra(graph, node))
    }
    return distances.reduce(function (x, y) { return (x && x < y) ? x : y; })
}

console.log(solutionTwo('resources/day12/test.txt'))
console.log(solutionTwo('resources/day12/input.txt'))