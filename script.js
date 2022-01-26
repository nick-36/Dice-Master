'use strict';

//player_0 element
let player_0 = document.querySelector('.player--0');
//player_1 element
let player_1 = document.querySelector('.player--1');

let player = document.querySelector('.player');
//PLAYER-1 SCORE
let player0Score = document.querySelector('#score--0');

//PLAYER-2 SCORE
let player1Score = document.querySelector('#score--1');

//ADDING HIDDDEN CLASS TO DICE

const diceImg = document.querySelector('.dice');

//player's Current Score element
let current_0 = document.querySelector('#current--0');
let current_1 = document.querySelector('#current--1');

//Restart Function

let Score, currentScore, playerActive, playing;
const Restart = function () {
  //STARTING VALUE
  currentScore = 0;
  Score = [0, 0];

  playerActive = 0;
  playing = true;

  current_0.innerHTML = 0;
  current_1.innerHTML = 0;

  player0Score.innerHTML = 0;
  player1Score.innerHTML = 0;

  diceImg.classList.add('hidden');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
};

Restart();

//Switch the player

const switchPlayer = function () {
  //setting player current score 0
  currentScore = 0;

  //setting Active player's current score 0
  document.querySelector(`#current--${playerActive}`).innerHTML = currentScore;

  //changing active player
  playerActive = playerActive === 0 ? 1 : 0;

  //toggle player active background color
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
};

//ROLLING THE DICE

const rollDice = function () {
  if (playing) {
    //Generating Random Number For Dice
    let randomDice = Math.floor(Math.random() * 6) + 1;
    //Adding new src for dice image
    let newSrc = `images/dice-${randomDice}.png`;
    diceImg.src = newSrc;
    //Removing Hidden class
    diceImg.classList.remove('hidden');

    //Setting Current Score
    if (randomDice !== 1) {
      //Add random dice to player's current sscore
      currentScore += randomDice;
      //Add current score to active player innerhtml
      document.querySelector(`#current--${playerActive}`).innerHTML =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

//GETTING ROLL-DICE BUTTON

const btnrollDice = document.querySelector('.btn--roll');
btnrollDice.addEventListener('click', rollDice);

//GETTING HOLD BUTTON
let btnHold = document.querySelector('.btn--hold');

btnHold.addEventListener('click', function () {
  if (playing) {
    //currentscore add to player active final score
    Score[playerActive] += currentScore;
    document.querySelector(`#score--${playerActive}`).innerHTML =
      Score[playerActive];

    //if score > 100 than finish the Game

    if (Score[playerActive] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove('player--active');

      diceImg.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', Restart);
