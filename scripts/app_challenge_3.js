/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGameActive, previousDice, winningScore;

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
    
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

function nextPlayer() {
    //this is the feature that does not work
    //setTimeout(function(){ document.querySelector('.player-' + activePlayer + '-panel').classList.add('loser')}, 10);
    //setTimeout(function(){ document.querySelector('.player-' + activePlayer + '-panel').classList.remove('loser')}, 100);
    
    if (activePlayer === 0) {
        setTimeout(function(){ document.querySelector('.player-0-panel').classList.add('loser')}, 100);
        setTimeout(function(){ document.querySelector('.player-0-panel').classList.remove('loser')}, 800);
    } else {
        setTimeout(function(){ document.querySelector('.player-1-panel').classList.add('loser')}, 100);
        setTimeout(function(){ document.querySelector('.player-1-panel').classList.remove('loser')}, 800);
    }
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';
    
    setTimeout(function() {
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
    }, 800)
}

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGameActive) {
        var firstDice = Math.floor((Math.random() * 6) + 1);
        var secondDice = Math.floor((Math.random() * 6) + 1);
        
        var firstDiceDOM = document.querySelector('.dice-1');
        var secondDiceDOM = document.querySelector('.dice-2');
        firstDiceDOM.style.display = 'block';
        secondDiceDOM.style.display = 'block';
        firstDiceDOM.src = 'images/dice-' + firstDice + '.png';
        secondDiceDOM.src = 'images/dice-' + secondDice + '.png';

        if (firstDice === 6 && secondDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (firstDice !== 1 && secondDice !==1) {
            roundScore += firstDice + secondDice;
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            nextPlayer();
        }
        //previousDice = dice;
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isGameActive) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        winningScore = document.querySelector('.winningScore').value;

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
          
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
          
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGameActive = false;
        } else {
            nextPlayer(); 
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);
