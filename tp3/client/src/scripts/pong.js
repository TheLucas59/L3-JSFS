'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  const theGame = new Game(theField);

  const keyAction = event => {
    switch(event.key) {
      case "ArrowDown" :
          theGame.paddle.moveDown();
          break;
      case "ArrowUp" :
          theGame.paddle.moveUp();
          break;
      default: return;
    }
    event.preventDefault();
  }

  window.addEventListener('keydown', keyAction);

  document.getElementById('start').addEventListener("click", () => startGame(theGame) );
}

window.addEventListener("load",init);

// true iff game is started
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = theGame => {
  if (!theGame.started) {
    theGame.start();
    document.getElementById('start').value = 'stop';
  }
  else {
    document.getElementById('start').value = 'jouer';
    theGame.stop();
  }
}
