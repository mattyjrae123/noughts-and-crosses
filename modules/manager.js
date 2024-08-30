import { board } from "./board.js";
import { AIAgent } from "./AIAgent.js";

/**
 * manager singleton
 * 
 * Sets up game and manages interaction between two players. Keeps track of
 * players turns and result etc.
 */

const manager = ((gameBoard = board) => {
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
    isAIAgent: false
  };

  const resetGame = () => {
    board.reset();
    board.refreshBoardUI();
    _playing = true;
    _movesRemaining = 9;
    // currPlayer = PLAYER_1;
    // _displayPlayer();
    _setPlayersMove(PLAYER_1);
  };

  const _setPlayersMove = (player) => {
    currPlayer = player;
    _displayPlayer();

    if (currPlayer.isAIAgent) {
      console.log("IS AI AGENT");
      const move = currPlayer.getMove(board);
      board.setTile(move[0], move[1], currPlayer.player);
      board.refreshBoardUI();

      if (currPlayer === PLAYER_1) {
        _setPlayersMove(PLAYER_2);
      } else {
        _setPlayersMove(PLAYER_1);
      }
    }
  };

  const _stopGame = () => {
    _playing = false;
    _movesRemaining = 0;
  };

  const _changePlayer = () => {
    if (currPlayer === PLAYER_1) {
      currPlayer = PLAYER_2;
    } else {
      currPlayer = PLAYER_1;
    }
  }

  const _displayPlayer = () => {
    _gameDisplay.textContent = `${currPlayer.player}'s turn`;
  };

  const _checkWinner = (col, row) => {
    // check column
    if (board.getTile(col, 0) === board.getTile(col, 1) && board.getTile(col, 0) === board.getTile(col, 2)) {
      return true;
    }

    // check row
    if (board.getTile(0, row) === board.getTile(1, row) && board.getTile(0, row) === board.getTile(2, row)) {
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
    if (!_playing) {
      return;
    }

    const col = e.target.getAttribute('data-col');
    const row = e.target.getAttribute('data-row');

    if (board.getTile(col, row) !== undefined) {
      return;
    }

    board.setTile(col, row, currPlayer.player);
    board.refreshBoardUI();
    _movesRemaining -= 1;

    if (_checkWinner(col, row)) {
      _stopGame();
      _gameDisplay.textContent = `Player ${currPlayer} you beauty! You won!`;
      return;
    }

    if (_movesRemaining <= 0) {
      _stopGame();
      _gameDisplay.textContent = "Game over! It's a draw!";
    }
    
    _changePlayer();
    _displayPlayer();
  };

  document.querySelector('#reset-btn')
          .addEventListener('click', () => {
            resetGame();
          });

  document.querySelectorAll('.gameboard-tile')
          .forEach((tile) => {
            tile.addEventListener('click', _processClick);
          });

  return {resetGame};

})();

export { manager };
