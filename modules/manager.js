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
  let _movesRemaining = 0;
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
    _movesRemaining = 9;
    _setPlayersTurn(PLAYER_1);
  };

  const _setPlayersTurn = (player) => {
    currPlayer = player;
    _displayPlayer();

    if (currPlayer.isAIAgent) {
      console.log("IS AI AGENT");
      const move = AIAgent.getMove(board);
      _setMove(move[0], move[1]);
    }
  };

  const _setMove = (row, col) => {
    board.setTile(row, col, currPlayer.player);
    board.refreshBoardUI();
    _movesRemaining--;

    if (_checkWinner(row, col)) {
      _stopGame();
      _gameDisplay.textContent = `Player ${currPlayer.player} you beauty! You won!`;
      return;
    }

    if (_movesRemaining <= 0) {
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
    _movesRemaining = 0;
  };

  const _displayPlayer = () => {
    _gameDisplay.textContent = `${currPlayer.player}'s turn`;
  };

  const _checkWinner = (row, col) => {
    // check column
    if (board.getTile(0, col) === board.getTile(1, col) && board.getTile(0, col) === board.getTile(2, col)) {
      return true;
    }

    // check row
    if (board.getTile(row, 0) === board.getTile(row, 1) && board.getTile(row, 0) === board.getTile(row, 2)) {
      return true;
    }

    // check diagonal from top-left
    if (board.getTile(0, 0) === board.getTile(1, 1) && board.getTile(0, 0) === board.getTile(2, 2)) {
      return board.getTile(0, 0) !== undefined;
    }

    // check diagonal from bottom-left
    if (board.getTile(0, 2) === board.getTile(1, 1) && board.getTile(0, 2) === board.getTile(2, 0)) {
     return board.getTile(0, 2) !== undefined;
    }

    return false;
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

  return {
    resetGame
  };

})();

export { manager };
