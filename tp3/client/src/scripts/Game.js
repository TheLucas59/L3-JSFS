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
  constructor(canvas, socket) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = this.setBasicBall()
    this.leftPaddle = this.setBasicLeftPaddle(0)
    this.rightPaddle = this.setBasicRightPaddle(0)
    this.started = false
    this.socket = socket
    this.setSocketEventsListeners()
    this.player = 0
  }

  setSocketEventsListeners() {
    this.socket.on('TooMuchConnections', () => {
      document.querySelector('#player').innerHTML = "Deux joueurs sont déjà connectés au jeu. Vous ne pouvez pas jouer tout de suite.";
      document.querySelector('#start').disabled = true
    });
    this.socket.on('firstPlayer', () => {
      document.querySelector('#player').innerHTML = "Joueur 1";
      this.player = 1
      this.setControls()
      this.setRightPaddleMovementByMessage()
    });
    this.socket.on('secondPlayer', () => {
      document.querySelector('#player').innerHTML = "Joueur 2";
      this.player = 2
      this.setControls()
      this.setLeftPaddleMovementByMessage()
    });
    this.socket.on('otherPlayerDisconnected', () => {
      document.querySelector('#player').innerHTML = "L'autre joueur s'est déconnecté";
      document.querySelector('#start').disabled = true
      document.querySelector('#start').value = 'Jouer'; 
      this.socket.emit('disconnected')
      this.stop()
    });

    document.getElementById('start').addEventListener("click", () => {
      if(document.querySelector('#start').value === 'Se déconnecter') {
        this.socket.emit('disconnected');
        document.querySelector('#start').value = 'Jouer';
        document.querySelector('#player').innerHTML = "Déconnecté";
        document.querySelector('#start').disabled = true
      }
    });
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

  setControls() {
    const keyAction = event => {
      switch(event.key) {
        case "ArrowDown" :
          if(this.player == 1) {
            this.leftPaddle.moveDown();
            console.log('player 1 : move down')
            this.socket.emit('moveDownLeft')
          }
          if(this.player == 2) {
            this.rightPaddle.moveDown();
            this.socket.emit('moveDownRight')
          }
          break;
        case "ArrowUp" :
          if(this.player == 1) {
            this.leftPaddle.moveUp();
            this.socket.emit('moveUpLeft')
        }
          if(this.player == 2) {
            this.rightPaddle.moveUp();
            this.socket.emit('moveUpRight')
          }
        break;
        default: return;
      }
      event.preventDefault();
    } 
  
    window.addEventListener('keydown', keyAction);
  }

  setRightPaddleMovementByMessage() {
    this.socket.on('moveUpRight', () => {
      this.rightPaddle.moveUp()
    })
    this.socket.on('moveDownRight', () => {
      this.rightPaddle.moveDown()
    })
  }

  setLeftPaddleMovementByMessage() {
    this.socket.on('moveUpLeft', () => {
      this.leftPaddle.moveUp()
    })
    this.socket.on('moveDownLeft', () => {
      console.log('player 2 : message reçu, left move down')
      this.leftPaddle.moveDown()
    })
  }
}
