/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/**
* @class Game
* @classdesc OOP Game controller
*/
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  createPhrases() {
    return [new Phrase('Got Milk'),
    new Phrase('You Win'),
    new Phrase('Mad Cow'),
    new Phrase('Fun Day'),
    new Phrase('Run Fast')];
  }

  /***
   * @method startGame - start of game
  ***/
  startGame() {
    // add keyboard listener, remove when game is over
    const body = document.querySelector('body');
    body.addEventListener('keyup', this.handleKeyUp);

    // hide the start overlay
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';

    // pick a phrase
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /***
   * @method gameOver - end of game
  ***/
  gameOver(isWinner) {
    // game over, delay a few second to show final letter
    setTimeout((isWinner) => {

      const messageElement = document.getElementById('game-over-message');
      const overlay = document.getElementById('overlay');

      if (isWinner) {
        messageElement.innerHTML = 'You win!';
        overlay.className = 'win';
      } else {
        messageElement.innerHTML = 'Sorry, try again next time!';
        overlay.className = 'lose';
      }

      // show the start overlay
      overlay.style.display = '';

      // remove keyboard event listener
      const body = document.querySelector('body');
      body.removeEventListener('keyup', this.handleKeyUp);

      this.resetGame();
    }, 500, isWinner);
  }

  /***
   * @method getRandomPhrase
   * @returns {object} phrase - a random phrase
  ***/
  getRandomPhrase() {
    // calculate the random number
    let randomNumber = Math.floor(Math.random() * this.phrases.length);

    // retrun a new phrase object
    return this.phrases[randomNumber];
  }

  /***
   * @method handleInteraction - process keyboard presses
  ***/
  handleInteraction(target) {

    const letter = target.innerHTML;
    if (this.activePhrase.checkLetter(letter)) {
      // letter was match
      target.classList.add('chosen');
      this.activePhrase.showMatchedLetter(letter);

      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      // no matching letter
      target.classList.add('wrong');
      this.removeLife();
    }

    // disable the keyboard button
    target.disabled = true;
  }

  /***
   * @method removeLife - changes the heart image
  ***/
  removeLife() {
    const olItems = document.querySelectorAll('#scoreboard li');

    // check list for images
    for (let i = 0; i < olItems.length; i++) {
      if (olItems[i].firstChild.src.includes("liveHeart.png")) {
        // set image to lost heart
        olItems[i].firstChild.src = "images/lostHeart.png";

        // keep track of missed items
        this.missed++;
        break;
      }
    }

    // check if game is over
    if (this.missed >= olItems.length) {
      this.gameOver(false);
    }
  }

  /***
    * @method checkForWin - check if phrase is complete
  ***/
  checkForWin() {
    let isWinner = true;

    const ulElement = document.querySelector('#phrase>ul');
    const liItems = ulElement.children;

    // check if any letters are still hidden
    for (let i = 0; i < liItems.length; i++) {
      if (liItems[i].classList.contains('hide')) {
        // hidden letters remain, not a winner
        isWinner = false;
        break;
      }
    }

    return isWinner;
  }

  /***
    * @method resetGame - resets all elements
  ***/
  resetGame() {
    // reset phrase li elements
    const ulElement = document.querySelector('#phrase>ul');
    ulElement.innerHTML = '';

    // enable all keyboard buttons
    const buttonElements = document.querySelectorAll('#qwerty button');
    for (let i = 0; i < buttonElements.length; i++) {
      buttonElements[i].className = 'key';
      buttonElements[i].removeAttribute('disabled');
    }

    // reset heart images
    const olItems = document.querySelectorAll('#scoreboard li');
    for (let i = 0; i < olItems.length; i++) {
      olItems[i].firstChild.src = "images/liveHeart.png";
    }
  }

  /***
   * @method  handleKeyUp - processes keyboard clicks
  ***/
  handleKeyUp(e) {
    // check for valid keyboard letter
    if (e.keyCode > 64 && e.keyCode < 91) {
      // convert decimal to letter
      const letter = String.fromCharCode(e.keyCode);

      // lookup button by tag and attribute
      const key = document.querySelector(`button[${letter}]`);

      // now click keyboard
      key.click();
    }
  }
}