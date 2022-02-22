import Mobile from './Mobile.js';
import { PADDLE_WIDTH } from './Paddle.js';
import { PADDLE_HEIGHT } from './Paddle.js';

// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;
export const BALL_WIDTH = 24;
export const BALL_HEIGHT = 24;

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }

  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      this.shiftY = - this.shiftY;    // rebond en haut ou en bas
    }
    else if(this.x <= 0) {
      this.theGame.rightPaddle.score++     
      document.querySelector('#score').innerHTML = this.theGame.leftPaddle.score + " - " + this.theGame.rightPaddle.score
      this.reset()                    // reset à gauche
    }
    else if(this.x + this.width >= this.theGame.canvas.width) {
      this.theGame.leftPaddle.score++
      document.querySelector('#score').innerHTML = this.theGame.leftPaddle.score + " - " + this.theGame.rightPaddle.score
      this.reset()                    // reset à droite
    }
    super.move();
  }

  reset() {
    this.theGame.stop()
    this.theGame.reset()
    document.getElementById('start').value = 'jouer'
  }

  collisionWith(paddle) {
    const leftTopCornerPaddle = [paddle.x, paddle.y];
    const rightBotCornerPaddle = [paddle.x + PADDLE_WIDTH, paddle.y + PADDLE_HEIGHT];

    const leftTopCornerBall = [this.x, this.y];
    const rightBotCornerBall = [this.x + BALL_WIDTH, this.y + BALL_HEIGHT];

    const p1 = [Math.max(leftTopCornerPaddle[0], leftTopCornerBall[0]), Math.max(leftTopCornerPaddle[1], leftTopCornerBall[1])];
    const p2 = [Math.min(rightBotCornerPaddle[0], rightBotCornerBall[0]), Math.min(rightBotCornerPaddle[1], rightBotCornerBall[1])];

    return (p1[0] < p2[0]) && (p1[1] < p2[1]);
  }

}
