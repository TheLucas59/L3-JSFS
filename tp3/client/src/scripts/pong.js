'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  const socket = io();
  const theGame = new Game(theField, socket);

  document.getElementById('start').addEventListener("click", () => {
    startGame(theGame)
  });
  document.querySelector('#start').disabled = true
  document.querySelector('#score').innerHTML = theGame.leftPaddle.score + " - " + theGame.rightPaddle.score
  socket.on('ready', () => {
    document.querySelector('#start').disabled = false
  })
}

window.addEventListener("load",init);

// true iff game is started
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = (theGame) => {
  if (!theGame.started) {
    theGame.start();
    document.querySelector('#start').value = 'Se déconnecter';
  }
  else {
    document.getElementById('start').value = 'Jouer';
    theGame.stop();
  }
}
