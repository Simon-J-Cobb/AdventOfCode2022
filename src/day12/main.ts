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

function Dijkstra(graph: node[]) {
    let current = graph[0]
    for (let node of graph) {
        if (node.value == 'S') {
            node.distance = 0
            current = node
        } else {
            node.distance = Infinity

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
    }
}


console.log(readInput('resources/day12/test.txt'))
console.log(Dijkstra(readInput('resources/day12/test.txt')))