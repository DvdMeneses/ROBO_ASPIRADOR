// Selecionando o tabuleiro e a pontuação
const board = document.getElementById("board");
const points = document.getElementById("points");
const robot = document.getElementById("robot");

// Definindo a matriz de 10x10
const ROWS = 10;
const COLS = 10;
const grid = new Array(ROWS);
const cells = new Array(ROWS);

// Criando as células do tabuleiro
for (let i = 0; i < ROWS; i++) {
  grid[i] = new Array(COLS);
  cells[i] = new Array(COLS);
  for (let j = 0; j < COLS; j++) {
    // 10% de chance de uma célula ser um obstáculo
    const isObstacle = Math.random() < 0.05;
    grid[i][j] = isObstacle ? "obstacle" : "clean";
    const cell = document.createElement("div");
    cell.className = `cell ${grid[i][j]}`;
    board.appendChild(cell);
    cells[i][j] = cell;
  }
}

// Definindo as coordenadas iniciais e a pontuação com base na primeira célula do tabuleiro
let cellRect = cells[0][0].getBoundingClientRect();
let x = cellRect.left + window.scrollX + cellRect.width / 2 - robot.offsetWidth / 2 + "px";
let y = cellRect.top + window.scrollY + cellRect.height / 2 - robot.offsetHeight / 2 + "px";
robot.style.left = x;
robot.style.top = y;
let score = 0;


// Conta o número de células com a classe "cell clean"
let cleanCells = document.querySelectorAll('.cell.clean').length;


document.addEventListener("keydown", function(event){
  switch (event.code) {
    case "KeyW":
      moveUp();
      break;
    case "KeyA":
      moveLeft();
      break;
    case "KeyS":
      moveDown();
      break;
    case "KeyD":
      moveRight();
      break;
    default:
      // caso a tecla pressionada não seja W, A, S ou D
      break;
  }
});

function startGame(){
  setInterval(() => {
    if(canMoveUp()){
      moveUp();
      console.log("conseguiu ir p cima")
    }else if(canMoveRight()){
      moveRight();
      console.log("conseguiu ir p direita")
    }else if(canMoveLeft()){
      moveLeft();
      console.log("conseguiu ir p esquerda")
    }else{
      moveDown();
      console.log("conseguiu ir p baixo")
    }
  }, 500);
}

function canMoveUp() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);

  const nextRowIndex = Math.round((robotTop - 40 - board.offsetTop) / 40);
  const nextCell = cells[nextRowIndex] && cells[nextRowIndex][Math.round((robotLeft - board.offsetLeft) / 40)];

  return nextCell && !nextCell.classList.contains("obstacle") && !nextCell.classList.contains("visited");
}

function canMoveRight() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);

  const nextColIndex = Math.round((robotLeft + 40 - board.offsetLeft) / 40);
  const nextCell = cells[Math.round((robotTop - board.offsetTop) / 40)] && cells[Math.round((robotTop - board.offsetTop) / 40)][nextColIndex];

  return nextCell && !nextCell.classList.contains("obstacle") && !nextCell.classList.contains("visited");
}

function canMoveDown() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);
  
  const nextRowIndex = Math.round((robotTop + 40 - board.offsetTop) / 40);
  const nextCell = cells[nextRowIndex] && cells[nextRowIndex][Math.round((robotLeft - board.offsetLeft) / 40)];
  
  return nextCell && !nextCell.classList.contains("obstacle") && !nextCell.classList.contains("visited");
}

function canMoveLeft() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);
  
  const nextColIndex = Math.round((robotLeft - 40 - board.offsetLeft) / 40);
  const nextCell = cells[Math.round((robotTop - board.offsetTop) / 40)] && cells[Math.round((robotTop - board.offsetTop) / 40)][nextColIndex];
  
  return nextCell && !nextCell.classList.contains("obstacle") && !nextCell.classList.contains("visited");
}

function moveUp() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);
  
  const nextRowIndex = Math.round((robotTop - 40 - board.offsetTop) / 40);
  const nextCell = cells[nextRowIndex] && cells[nextRowIndex][Math.round((robotLeft - board.offsetLeft) / 40)];

  if (nextCell && !nextCell.classList.contains("obstacle")) {
    robotTop = Math.round(robotTop - 40);
    robot.style.top = robotTop + "px";
    updateScore(nextCell);
  }else if(!(nextCell && !nextCell.classList.contains("obstacle")) ){
    if(canMoveRight()){
      moveRight();
    }else if(canMoveLeft()){
      moveLeft();
    }else{
      moveDown();
    }
  }
}


function moveLeft() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);

  const nextColIndex = Math.round((robotLeft - 40 - board.offsetLeft) / 40);
  const nextCell = cells[Math.round((robotTop - board.offsetTop) / 40)] && cells[Math.round((robotTop - board.offsetTop) / 40)][nextColIndex];
  if (nextCell && !nextCell.classList.contains("obstacle")) {
    robotLeft = Math.round(robotLeft - 40);
    robot.style.left = robotLeft + "px";
    updateScore(nextCell);
  }else if(!(nextCell && !nextCell.classList.contains("obstacle"))){
    if(canMoveUp()){
      moveUp();
    }else if(canMoveRight()){
      moveRight();
    }else{
      moveDown();
    }
  }
}

function moveDown() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);

  const nextRowIndex = Math.round((robotTop + 40 - board.offsetTop) / 40);
  const nextCell = cells[nextRowIndex] && cells[nextRowIndex][Math.round((robotLeft - board.offsetLeft) / 40)];
  if (nextCell && !nextCell.classList.contains("obstacle")) {
    robotTop = Math.round(robotTop + 40);
    robot.style.top = robotTop + "px";
    updateScore(nextCell);
  }else if(!(nextCell && !nextCell.classList.contains("obstacle"))){
    if(canMoveLeft()){
      moveLeft();
    }else if(canMoveRight()){
      moveRight();
    }else{
      moveUp();
    }
  }
}

function moveRight() {
  const robot = document.getElementById("robot");
  let robotTop = parseInt(robot.style.top);
  let robotLeft = parseInt(robot.style.left);

  const nextColIndex = Math.round((robotLeft + 40 - board.offsetLeft) / 40);
  const nextCell = cells[Math.round((robotTop - board.offsetTop) / 40)] && cells[Math.round((robotTop - board.offsetTop) / 40)][nextColIndex];
  if (nextCell && !nextCell.classList.contains("obstacle")) {
    robotLeft = Math.round(robotLeft + 40);
    robot.style.left = robotLeft + "px";
    updateScore(nextCell);
  }else if(!(nextCell && !nextCell.classList.contains("obstacle"))){
    if(canMoveDown()){
      moveDown();
    }else if(canMoveLeft()){
      moveLeft();
    }else{
      moveUp();
    }
  }
}

startGame();

function updateScore(cell) {
  if (cell.classList.contains("clean")) {
    score += 10;
    cell.classList.remove("clean");
    cell.classList.add("visited");
  } else if (cell.classList.contains("obstacle")) {
    score -= 5;
  }
  points.textContent

  checkGameOver()
}


function checkGameOver() {
  let dirtyCells = document.getElementsByClassName("cell clean");
  if (dirtyCells.length === 0) {
    alert("Você venceu!");
    document.removeEventListener("keydown", handleKeyDown);
  }
}
