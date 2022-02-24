'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  const socket = io();
  const theGame = new Game(theField, socket);

  const keyAction = event => {
    switch(event.key) {
      case "ArrowDown" :
          theGame.leftPaddle.moveDown();
          theGame.rightPaddle.moveDown();
          break;
      case "ArrowUp" :
          theGame.leftPaddle.moveUp();
          theGame.rightPaddle.moveUp();
          break;
      default: return;
    }
    event.preventDefault();
  } 

  window.addEventListener('keydown', keyAction);

  document.getElementById('start').addEventListener("click", () => {
    startGame(theGame)
  });
  document.querySelector('#score').innerHTML = theGame.leftPaddle.score + " - " + theGame.rightPaddle.score

}

window.addEventListener("load",init);

// true iff game is started
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = (theGame, socket) => {
  if (!theGame.started) {
    theGame.start();
    document.querySelector('#start').value = 'Se déconnecter';
  }
  else {
    document.getElementById('start').value = 'Jouer';
    theGame.stop();
  }
}
