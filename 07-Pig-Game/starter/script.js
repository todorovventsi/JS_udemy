'use strict';

// Constants
const DICE_OPTIONS = 6;

// Selecting elements
const scoreZeroEl = document.getElementById('score--0');
const scoreOneEl = document.getElementById('score--1');
const playerZeroCurrent = document.querySelector('#current--0');
const playerOneCurrent = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const playerZeroSec = document.querySelector('.player--0'); // toggle active class
const playerOneSec = document.querySelector('.player--1'); // toggle active class

// Reseting the game to starting position
function resetGame() {
  scoreZeroEl.textContent = '0';
  scoreOneEl.textContent = '0';
  playerZeroSec.querySelector('.name').textContent = 'Player 1';
  playerZeroSec.classList.add('player--active');
  playerOneSec.classList.remove('player--active');
  playerOneSec.querySelector('.name').textContent = 'Player 2';
  diceEl.classList.add('hidden');
  rollBtn.removeAttribute('disabled');
  holdBtn.removeAttribute('disabled');
}

resetGame();

// User events
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', handleHoldBtn);
newBtn.addEventListener('click', resetGame);

// Game functionality

let currentScore = 0;

function rollDice() {
  let activePlayer = document.querySelector('.player--active');
  // 1. Generate and display number
  let number = Math.floor(Math.random() * DICE_OPTIONS) + 1;
  let imgRef = `dice-${number}.png`;

  diceEl.setAttribute('src', imgRef);
  diceEl.classList.remove('hidden');

  // 2. Switch the player if one is the result
  if (number === 1) {
    currentScore = 0;
    activePlayer.querySelector('.current-score').textContent = currentScore;
    changePlayer();
    return;
  }
  // 3. Continue the game
  currentScore += number;
  activePlayer.querySelector('.current-score').textContent = currentScore;
}

function changePlayer() {
  playerZeroSec.classList.toggle('player--active');
  playerOneSec.classList.toggle('player--active');
}

function handleHoldBtn() {
  let activePlayer = document.querySelector('.player--active');
  let activePlayerScoreEl = activePlayer.querySelector('.score');

  let newScore = Number(activePlayerScoreEl.textContent) + currentScore;

  activePlayerScoreEl.textContent = newScore;
  currentScore = 0;
  activePlayer.querySelector('.current-score').textContent = currentScore;

  if (newScore >= 100) {
    activePlayer.querySelector('.name').textContent = 'Winner';
    rollBtn.setAttribute('disabled', 'disabled');
    holdBtn.setAttribute('disabled', 'disabled');
    return;
  }

  changePlayer();
}
