/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, dice, currentPlayer, prevDice, roundScore, gamePlaying, plays = 0, wins = [0,0], holds, rolls;

newGame();

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);

document.querySelector('.btn-new').addEventListener('click', newGame);

function hold () {
    
    if (gamePlaying) {
        
        if (roundScore) {
            
            holds[currentPlayer]++;
            document.querySelector('.holds-' + currentPlayer).textContent = holds[currentPlayer];
            
            scores[currentPlayer] += roundScore;
            document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
            
            var winningScore = parseInt(document.querySelector('.final-score').textContent);
                                        
            if (!winningScore) {
                winningScore = 100;
            }

            if (scores[currentPlayer] > winningScore) {
                
                wins[currentPlayer]++;
                document.querySelector('.wins-' + currentPlayer).textContent = wins[currentPlayer];
                
                rolls[currentPlayer] = 0;
                holds[currentPlayer] = 0;
                document.querySelector('.rolls-' + currentPlayer).textContent = 0;
                document.querySelector('.holds-' + currentPlayer).textContent = 0;

                document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
                document.getElementById('dice').style.display = 'none';
                document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
                gamePlaying = false;

            } else {

                nextPlayer();

            }
            
        } else {
        
            alert('No current score. Please roll the dice!');
        
        }
        
    }
    
};

function rollDice () {
    
        if (gamePlaying) {
        
        rolls[currentPlayer]++;
        document.querySelector('.rolls-' + currentPlayer).textContent = rolls[currentPlayer];
        
        dice = Math.floor(Math.random()* 6 + 1);

        document.getElementById('dice').src = 'dice-' + dice + '.png';
        document.getElementById('dice').style.display = 'block';
        
        if (dice === 6 && prevDice === 6) {
            
            scores[currentPlayer] = 0;
            document.getElementById('score-' + currentPlayer).textContent = 0;
            
            alert('Two sixes in row. Loosing your total score!!')
            
            nextPlayer();
            
        } else if (dice != 1) {
            
            roundScore += dice;
            document.getElementById('current-' + currentPlayer).textContent = roundScore;
            prevDice = dice;
            
        } else {
            
            alert ('So unlucky! You got 1. Loosing your current score. Press HOLD next time so you keep it.');
            nextPlayer();
            
        }
        
    }
}

function nextPlayer () {
    
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    prevDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    
}

function newGame () {
    
    scores = [0,0];
    currentPlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevDice = 0;
    plays++;
    holds = [0,0];
    rolls = [0,0];
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.rolls-0').textContent = 0;
    document.querySelector('.holds-0').textContent = 0;
    document.querySelector('.wins-0').textContent = 0;
    
    document.querySelector('.rolls-1').textContent = 0;
    document.querySelector('.holds-1').textContent = 0;
    document.querySelector('.wins-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}