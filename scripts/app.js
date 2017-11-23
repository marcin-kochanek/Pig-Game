/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGameActive;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isGameActive = true;
    
    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
    document.getElementById('name-0').innerHTML = 'Player1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.dice').style.display = 'none';
    //LUB document.getElementsByClassName('dice')[0].style.display = 'none';
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';
}

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGameActive) {
        var dice = Math.floor((Math.random() * 6) + 1);

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isGameActive) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGameActive = false;
        } else {
            nextPlayer(); 
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);
