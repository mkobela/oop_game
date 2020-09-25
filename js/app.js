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
  * @function  handleQwerty - processes mouse clicks
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

/***
  * @function  handleKeyUp - processes keyboard clicks
***/
function handleKeyUp(e){
  // check for valid keyboard letter
  if(e.keyCode > 64 && e.keyCode < 91){
    // convert decimal to letter
    const letter = String.fromCharCode(e.keyCode);

    // lookup button by tag and attribute
    const key = document.querySelector(`button[${letter}]`);

    // now click keyboard
    key.click();
  }

}

// add handler to Start button
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', handleStartBtn);

// add handler to qwerty keyboard
const qwertyDiv = document.getElementById('qwerty');
qwertyDiv.addEventListener('click', handleQwerty);

const body = document.querySelector('body');
body.addEventListener('keyup', handleKeyUp);