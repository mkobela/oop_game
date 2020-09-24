/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


let game = null;

/***
  * @function handleStartBth - processes the start button
***/
function handleStartBtn() {
  // start a new game
  game = new Game();
  game.startGame();
}

/***
  * @function  handleQwerty - processes the keyboard clicks
***/
function handleQwerty(event) {

  // get clicked button
  const target = event.target;
  if (target.className = 'key') {
      // check for key button
    if (target.tagName === 'BUTTON') {
      // send letter to game handler
      game.handleInteraction(target);
    }
  }
}

// add handler to Start button
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', handleStartBtn);

// add handler to qwerty keyboard
const qwertyDiv = document.getElementById('qwerty');
qwertyDiv.addEventListener('click', handleQwerty);