import Ball from './Ball.js';
import Paddle from './Paddle.js';

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = this.setBasicBall()
    this.leftPaddle = this.setBasicLeftPaddle(0)
    this.rightPaddle = this.setBasicRightPaddle(0)
    this.started = false
  }

  setBasicBall() {
    return new Ball(this.canvas.width/2, this.canvas.height/2, this);
  }

  setBasicLeftPaddle(score) {
    return new Paddle(this.canvas.width*0.01, this.canvas.height*0.5-40, this, score)
  }

  setBasicRightPaddle(score) {
    return new Paddle(this.canvas.width*0.96, this.canvas.height*0.5-40, this, score)
  }

  /** start this game animation */
  start() {
    this.started = true;
    this.animate();
  }
  /** stop this game animation */
  stop() {
    this.started = false
    window.cancelAnimationFrame(this.raf);
  }

  reset() {
    this.ball = this.setBasicBall()
    this.leftPaddle = this.setBasicLeftPaddle(this.leftPaddle.score)
    this.rightPaddle = this.setBasicRightPaddle(this.rightPaddle.score)
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw()
    if(this.started) {
      this.raf = window.requestAnimationFrame(this.animate.bind(this));
    }
  }
  /** move then draw the bouncing ball */
  moveAndDraw() {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.ball.move();
    this.ball.draw(ctxt);
    this.leftPaddle.draw(ctxt);
    this.rightPaddle.draw(ctxt);
    if(this.ball.collisionWith(this.leftPaddle)) {
      const absoluteSpeed = Math.abs(this.ball.shiftX) + Math.abs(this.ball.shiftY);
      this.ball.shiftY = this.leftPaddle.whichSegment(this.ball.y);
      this.ball.shiftX = absoluteSpeed - this.ball.shiftY;
    }
    if(this.ball.collisionWith(this.rightPaddle)) {
      const absoluteSpeed = Math.abs(this.ball.shiftX) + Math.abs(this.ball.shiftY);
      this.ball.shiftY = this.rightPaddle.whichSegment(this.ball.y);
      this.ball.shiftX = -(absoluteSpeed - this.ball.shiftY);
    }
  }

}
