'use strict';
let secretNumber = getSecretNumber();
let score = 20;
let highScore = 0;

const displayMessage = function (msg) {
    document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
        displayMessage('⛔ No number!');
        return;
    }
    if (score <= 1) {
        displayMessage('😟 Game Over!!!');
        return;
    }
    if (guess == secretNumber) {
        displayMessage('🏅 Success!');
        document.querySelector('.number').textContent = guess;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        // Change high score
        if (score > highScore) {
            document.querySelector('.highscore').textContent = score;
        }
        return;
    }

    score--;
    document.querySelector('.score').textContent = score;
    displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
});

document.querySelector('.again').addEventListener('click', handleAgainBtn);

function handleAgainBtn() {
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = '?';

    secretNumber = getSecretNumber();
    score = 20;
    document.querySelector('.score').textContent = score;
}

function getSecretNumber() {
    return Math.floor(Math.random() * (20 + 1));
}
