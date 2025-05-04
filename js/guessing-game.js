/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

/* 
NUMBER GUESSING GAME
Implement the missing code based on the comments
*/

// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  // Return random integer
  return Math.ceil(Math.random() * 100 + 1);
}

// Shuffle array using Fisher-Yates algorithm
function shuffle(array) {
  // Modify array in place and return it
  let len = array.length, t, i;
  while (len) {
    i = Math.floor(Math.random() * len--);
    t = array[len];
    array[len] = array[i];
    array[i] = t;
  }
  return array;
}

class Game {
  constructor() {
    // Initialize properties:
    // - playersGuess (current guess)
    this.playersGuess = 0;
    // - pastGuesses (array of previous guesses)
    this.pastGuesses = [];
    // - winningNumber (generated number)
    this.winningNumber = generateWinningNumber();
  }

  // Return absolute difference between guess and winning number
  difference() {
    // Calculate and return difference
    return Math.abs(this.winningNumber - this.playersGuess);
  }

  // Return true if guess is lower than winning number
  isLower() {
    // Return boolean comparison
    return (this.playersGuess < this.winningNumber);
  }

  // Validate and process guess
  playersGuessSubmission(num) {
    // Throw error if invalid number
    /*if(isNaN(num)) {
      return "YOU IDIOT YOU'VE DOOMED US ALL";
    }*/
    // Set playersGuess
    this.playersGuess = num;
    // Return checkGuess result
    return this.checkGuess();
  }

  // Evaluate guess and return feedback message
  checkGuess() {
    // Handle win condition
    if(this.playersGuess === this.winningNumber) {
      return "YOU WON BUT DON'T GET A FAT HEAD WIENER";
    }
    // Handle duplicate guess
    for(let i = 0; i < this.pastGuesses.length; i++) {
      if(this.playersGuess === this.pastGuesses[i]) {
        return "YOU ALREADY TYPED THAT TWINKLETOES";
      }
    }
    // Add to pastGuesses
    this.pastGuesses.push(this.playersGuess);
    // Handle max guesses
    if(this.pastGuesses.length == 5) {
      return "YOU LOST WHELP TO THE STUCCO MINES WITH YOU"
    }
    // Return temperature feedback
    if(this.winningNumber - this.playersGuess <= 10) {
      return "GETTING WARMER DONKEY-BRAINS"
    }
    else if (this.winningNumber - this.playersGuess > 10) {
      return "SO COLD MY BUTT IS FREEZING";
    }
    else {
      return "YOU'RE SO LOST YOU'RE IN ANTARCTICA POLAR BEAR FOOD";
    }
  }

  // Generate array with 3 numbers (winning + 2 random)
  provideHint() {
    // Create array and shuffle
    let hintArray = shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
    return hintArray;
  }
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize game state
  const newGame = new Game();
  // Get DOM elements
  let messagebox = document.getElementById("message-box");
  // Set up event handlers for:
  // - Submit guess
  const submitButton = document.getElementById('submit-guess');
  submitButton.onclick = function() {
    let playerInput = document.getElementById('player-input');
    messagebox.innerHTML = newGame.playersGuessSubmission(playerInput);
  }
  // - Reset game
  // - Show hint
  document.getElementById('hint-button').addEventListener("click", printHint);
  function printHint() {
    let hintbox = [];
    hintbox = newGame.provideHint();
    messagebox.innerHTML = `${hintbox[0]}, ${hintbox[1]}, ${hintbox[2]}`;
  }
  // Implement:
  // - Input validation
  // - Display updates
  // - Game state management
});
