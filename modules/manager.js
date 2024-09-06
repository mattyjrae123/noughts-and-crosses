import { board } from "./board.js";
import { AIAgent } from "./AIAgent.js";

/**
 * manager singleton
 * 
 * Sets up game and manages interaction between two players. Keeps track of
 * players turns and result etc.
 */

const manager = (() => {
  let _playing = false;
  let currPlayer = undefined;
  let _gameDisplay = document.querySelector('#gameboard-display');
  
  const PLAYER_1 = {
    player: "x",
    isAIAgent: false
  };

  const PLAYER_2 = {
    player: "o",
    isAIAgent: true
  };

  const resetGame = () => {
    board.reset();
    board.refreshBoardUI();
    _playing = true;
    _setPlayersTurn(PLAYER_1);
  };

  const _setPlayersTurn = (player) => {
    currPlayer = player;
    _gameDisplay.textContent = `${currPlayer.player}'s turn`;

    if (currPlayer.isAIAgent) {
      const move = AIAgent.getMove(board, currPlayer.player);
      _setMove(move[0], move[1]);
    }
  };

  const _setMove = (row, col) => {
    board.setTile(row, col, currPlayer.player);
    board.refreshBoardUI();

    if (board.gameWon()) {
      _stopGame();
      _gameDisplay.textContent = `Player ${currPlayer.player} you beauty! You won!`;
      return;
    }

    if (!board.hasMovesRemaining()) {
      _stopGame();
      _gameDisplay.textContent = "Game over! It's a draw!";
      return;
    }
    
    if (currPlayer === PLAYER_1) {
      _setPlayersTurn(PLAYER_2);
    } else {
      _setPlayersTurn(PLAYER_1);
    }
  };

  const _stopGame = () => {
    _playing = false;
  };

  const _processClick = (e) => {
    if (currPlayer.isAIAgent) {
      return;
    }

    if (!_playing) {
      return;
    }

    const row = e.target.getAttribute('data-row');
    const col = e.target.getAttribute('data-col');

    if (board.getTile(row, col) !== undefined) {
      return;
    }

    _setMove(row, col);
  };

  document.querySelector('#reset-btn')
          .addEventListener('click', () => {
            resetGame();
          });

  document.querySelectorAll('.gameboard-tile')
          .forEach((tile) => {
            tile.addEventListener('click', _processClick);
          });
  
  document.querySelector('form button')
    .addEventListener('click', () => {
      const player1IsAI = document.querySelector('input[name="player-1"]:checked').value === "ai";
      const player2IsAI = document.querySelector('input[name="player-2"]:checked').value === "ai";

      if (player1IsAI) {
        PLAYER_1.isAIAgent = true;
      } else {
        PLAYER_1.isAIAgent = false;
      }

      if (player2IsAI) {
        PLAYER_2.isAIAgent = true;
      } else {
        PLAYER_2.isAIAgent = false;
      }

      document.querySelector("#modal-menu").style.display = 'none';

      resetGame();
  });

  document.querySelector('#settings-btn')
    .addEventListener('click', () => {
      document.querySelector("#modal-menu").style.display = 'flex';
  });

  return {
    resetGame
  };

})();

export { manager };
