const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const gifPosition= {
  x: undefined,
  y: undefined

}

let enemyPosition = []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
 

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
 
  enemyPosition = []
  
  game.clearRect(0,0,canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        } 
      } else if (col == 'I') {
        gifPosition.x = posX
        gifPosition.y = posY
      }  else if (col == 'X'){
        enemyPosition.push({
          x: posX,
          y: posY
        })
      }
      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {

  const giftCollitionX = playerPosition.x.toFixed(2) ==  gifPosition.x.toFixed(2)
  const giftCollitionY =  playerPosition.y.toFixed(2) == gifPosition.y.toFixed(2)
  const giftCollition = giftCollitionX && giftCollitionY

  if (giftCollition){
    console.log('ganaste');
  }

  const enemyCollition = enemyPosition.find(enemy => {
    const enemyCollitionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2)
    const enemyCollitionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2)
    return enemyCollitionX && enemyCollitionY
  })

  if (enemyCollition){
    console.log('Te moriste');
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
  
}
function moveUp() {

  if((playerPosition.y - elementsSize) < elementsSize){
    console.log('out');
  }else{
  playerPosition.y -= elementsSize;
  startGame();
  }
}
function moveLeft() {

  if((playerPosition.x - elementsSize) < elementsSize){
    console.log('out');
  }else{
  playerPosition.x -= elementsSize;
  startGame();
  }
}
function moveRight() {

  if((playerPosition.x + elementsSize) > canvasSize){
    console.log('out');
  }else{
  playerPosition.x += elementsSize;
  startGame();
  }
}
function moveDown() {
 
  if((playerPosition.y + elementsSize) > canvasSize){
    console.log('out');
  }else{
  playerPosition.y += elementsSize;
  startGame();
  }
}
