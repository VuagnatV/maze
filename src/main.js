const fs = require('fs');
const PriorityQueue = require('./PriorityQueue');

class Node {
  constructor(x, y, parent, h, g, value){
    this.x = x
    this.y = y
    this.parent = parent
    this.h = h
    this.g = g
    this.f = g + h
    this.discovered = false
    this.value = value
  }
}

function pathMaking(node, arr){
  if(!node) return arr
  arr.push(node)
  return pathMaking(node.parent, arr)
}

function display(maze, path){
  for(let i = 0; i < path.length; i++) maze[path[i].x][path[i].y] = 'O'
  for(let i = 0; i < maze.length; i++){
    for(let j = 0; j < maze[i].length; j++){
      process.stdout.write(maze[i][j])
    }
    console.log('')
  }
}

let maze = fs.readFileSync(process.argv[2], 'utf-8').split('\n')
for(let i = 0; i < maze.length; i++) maze[i] = maze[i].split('')

function findCoordinate(maze, node){
  for(let i  = 0; i < maze.length; i++){
    for(let j = 0; j < maze[i].length; j++){
      if(maze[i][j] == node) return {x : i, y : j} 
    }
  }
}

function pathFinding(maze, sc, goal){

  let copy = []
  for(let i = 0; i < maze.length; i++){
    copy[i] = maze[i].slice()
  }
  const pq = new PriorityQueue()
  const start = new Node(sc.x, sc.y, null, Math.abs(sc.x - goal.x) + Math.abs(sc.y - goal.y), 0, maze[sc.x][sc.y])
  pq.enqueue(start, start.f)

  while(!pq.isEmpty()){
    
    let curr = pq.dequeue()
    curr.discovered = true
    if(maze[curr.x][curr.y] == '2'){
      for(let i = 0; i < copy.length; i++) console.log(...copy[i])
      return curr
    } 
    copy[curr.x][curr.y] = '-'
    const directions = [{x: curr.x + 1, y: curr.y}, {x: curr.x, y: curr.y - 1}, {x: curr.x - 1, y: curr.y},{x: curr.x, y: curr.y + 1}]
    for(let i = 0; i < directions.length; i++){
      let x = directions[i].x
      let y = directions[i].y
      if(x > maze.length - 1 || x < 0) continue
      if(y > maze[x].length - 1 || y < 0) continue
      if(copy[x][y] == '*' || copy[x][y] == '-') continue
      const neighbor = new Node(x, y, curr, Math.abs(x - goal.x) + Math.abs(y - goal.y), curr.g + 1, maze[x][y])
      pq.enqueue(neighbor, neighbor.h)
    }
    
  }
  return 'fail'
}

let node = pathFinding(maze, findCoordinate(maze, '1'), findCoordinate(maze, '2'))
let path = pathMaking(node, [])
display(maze, path)