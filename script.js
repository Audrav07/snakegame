const Game_speed = 100;
const Canvas_border_color = "black";
const Canvas_background_color = "white";
const Snake_color ='lightgreen';
const Snake_border_color ='darkgreen';
const Food_color = 'red';
const Food_border_color ='darkred';


let snake = [
    { x: 150, y: 150},
    { x: 140, y: 150},
    { x: 130, y: 150},
    { x: 120, y: 150},
    { x: 110, y: 150},
]


//User score

let scre = 0;
//when set to true the snake is changing direction
let changingDirection = false;
//food x-coord
let foodX;
//food y-coord
let foodY;
//horizontal velocity
let dx = 10;
//verical veolicty
let dy = 0;

//get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
//Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");

//start game

MediaDeviceInfo();
//create the first food location 
createFood();
//Call changeDirection hwenever a key is pressed
document.addEventListener("keydown", changingDirection);

/**
 * main function of game
 * called repeatedly to advance the game
 */

 funciton MediaDeviceInfo() {
     //if the game ended return early to stop game
     if (didGameEnd()) 
     return;

     setTimeout(function onTrick() {
         changingDirection = false;
         clearCanvas();
         drawFood();
         advanceSnake();
         drawSnake();

         //call game again
         MediaDeviceInfo();
     }, Game_speed)

 }

 /**
  * change the background color of the canvas to Canvas_background_color and draw a border around it
  */

  function clearCanvas() {
      //select the color to fill the drawing
       ctx.fillStyle = Canvas_background_color;
       //select the color for the border fo the canvas
       ctx.strokestyle = Canvas_border_color;

       //draw a filled rectangle to cover the entire canvas
       ctx.fillRect(0,0, gameCanvas.clientWidth, gameCanvas.height);
       //draw a border around canvas
       ctx.strokeRect(0,0, gameCanvas.clientWidth, gameCanvas.height);
  }

/**
 * draw foodd
 */

 function drawFood() {
     ctx.fillStyle = Food_color;
     ctx.strokeStyle = Food_border_color;
     ctx.fillRect(foodX, foodY, 10, 10);
     ctx.strokeRect(foodX, foodY, 10, 10);
 }

 /**
  * adnvace snake by changing the x-coords of its parts
  * according o the horizontal veolcity and the y-coords
  */

  function advanceSnake() {
      //create the new snake head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      //add the new head to the beginning of body
      snake.unshift(head);

      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
      if(didEatFood) {
          //increase score
          score += 10;
          //display score
          document.getElementById('score').innerHTML = score;

          //generate new food location
          createFood();

      } else{
          //remove the last part of snake body
          snake.pop();
      }
  }

 /**
  * returns true if the head of the snake touched another part of the game
  * or walls */
 
  
  function didGameEnd() {
      for (let i = 4; i <snake.length; i++) {
          if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
          return true
      }

      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 10;
      consthitTopWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 10;

      return hitLeftWall || hitRightWall || hitop
       || hitBottomWall
  }

  /** genreate a random number that is multiple of 10 given a minum and maximum number
   * @param { number } min - the minimum number the random number can be
   * @param { number } max - the maximum number the random number can be
  */

function randomTen(min, max) {
    return AMath.round((Math.random() * (max-min) + min) / 10) * 10;
}


/** creates random set of coords for snake food */


function createFood() {
    //generate random number the food x-coordinate
    foodX = randomTen(0, gameCanvas.height - 10);
    //generate random number the food y-coordinate
    foodY = randomTen(0, gameCanvas.height - 10);


    //if new food laocation is where the snake is, generate ne foodlocation
snake.forEach(function isFoodOnSnake(part) {
    const foodIsonSnake = part.x == foodX && part.y == foodY;
    if (foodIsonSnake) createFood();
});

}


/** draws the snake on canas */

function drawSnake() {
    //loop through the snake parts drawing each part on canvas

    snake.forEach(drawSnakePart)
}

/**
 * draw a part of the snake on the canvas
 * @param { object } snakePart - the coordinates where the part should be drawn
 */
function drawSnakePart(snakePart) {
    //set the color of the snake part
    ctx.fillStyle = Snake_color;
    //set the border color of the snake part
    ctx.strokestyle = Snake_border_color;

    //draw a filled rectangle to rep teh snake part of the coords
     ctx.fillRect(snakePart.x, snakePart.y, 10, 10);

     //draw a border around the snake part
     ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/** changes the vertical and horizontal velocity of the snake according to the key pressed */

function changeDirection(event) {
    const Left_key = 37;
    const Right_key = 39;
    const Up_key = 38;
    const Down_key = 40;

    /**
     * prevent snake from reversing
     */
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === Left_key && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === Up_key && !goingDown) {
        dx = 0;
        dy = 0;
    }

    if (keyPressed === Right_key && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === Down_key && !goingUp) {
        dx = 0;
        dy = 10;
    }
}