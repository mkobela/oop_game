/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
* @class Phrase
* @classdesc Phrase handler
*/
class Phrase {
  constructor(phrase){
    this.phrase = phrase.toLowerCase();
  }

  /***
   * @method addPhraseToDisplay - displays new phrase
  ***/
  addPhraseToDisplay(){
    let displayElement = ``;

    // loop for each letter in phrase
    for( let i = 0; i < this.phrase.length; i++){
      
      // get each letter
      const letter = this.phrase.charAt(i);
      if(letter === ' '){
        // this is a space
        displayElement += `<li class="space"> </li>`;
      }else{
        // this is a letter
        displayElement += `<li class="hide letter ${letter}">${letter}</li>`;
      }
    }

    // add list items to page
    const ulElement = document.querySelector('#phrase>ul');
    ulElement.innerHTML = displayElement;
  }

  /***
   * @method checkLetter - check if selected letter is in phrase
   * @returns {boolean} - true if match
  ***/
  checkLetter(letter){
    // check if letter is in phase
    if(this.phrase.includes(letter)){
      return true;
    }
    return false;
  }

  /***
   * @method showMatchedLetter - displays the matched letter
  ***/
  showMatchedLetter(letter){
    const ulElement = document.querySelector('#phrase>ul');
    const liItems = ulElement.children;

    // loop over each hidden letter
    for( let i = 0; i < liItems.length; i++){
      if(liItems[i].classList.contains(letter)){
        // show the matching letter
        liItems[i].classList.remove('hide');
        liItems[i].classList.add('show');
        break;
      }
    }
  }
}