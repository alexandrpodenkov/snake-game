const blockSize = 25;
const cols = 20;
const rows = 20;

let board 
let context;


// food

let foodX = 10;
let foodY = 10;

// snake

let snakeX = 5 * blockSize;
let snakeY = 5 * blockSize;

let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

let gameOver = false;


window.onload = () => {
    board = document.getElementById('board');
    board.width = blockSize * cols;
    board.height = blockSize * rows;
    
    context = board.getContext('2d');

    placeFood();

    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000/10);
}

function update(){
    if(gameOver){
        location.reload(); 
        return;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
    
   context.fillStyle = 'lime';
   snakeX += velocityX * blockSize;
   snakeY += velocityY * blockSize;
   context.fillRect(snakeX, snakeY, blockSize, blockSize);
   for(let i = 0; i < snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
   }
   
   context.fillStyle = 'red';
   context.fillRect(foodX, foodY, blockSize, blockSize);

   if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
    gameOver = true;
    alert('Game Over');
   }

   for(let i = 0; i < snakeBody.length; i++){
    if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
        gameOver = true;
        alert('Game Over');   
    }
   }
}

function placeFood(){
   foodX = Math.floor(Math.random() * cols) * blockSize;
   foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e){
    if(e.code === 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }if(e.code === 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }if(e.code === 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }if(e.code === 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }  
}