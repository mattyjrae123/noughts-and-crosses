import { board } from "./board.js";
import { AIAgent } from "./AIAgent.js";

/**
 * manager singleton
 * 
 * Sets up game and manages interaction between two players. Keeps track of
 * players turns and result etc.
 */

const manager = (() => {
  const AI_MOVE_DELAY = 1000;
  let _playing = false;
  let currPlayer = undefined;
  let _gameDisplay = document.querySelector('#gameboard-display');
  
  const PLAYER_1 = {
    player: "x",
    isAIAgent: false,
    difficulty: AIAgent.EASY
  };

  const PLAYER_2 = {
    player: "o",
    isAIAgent: false,
    difficulty: AIAgent.EASY
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
      const startTime = Date.now();
      const move = AIAgent.getMove(board, currPlayer.player);
      const endTime = Date.now();

      const timeDifference = endTime - startTime;
      console.log(timeDifference);
      if (timeDifference < AI_MOVE_DELAY) {
        setTimeout(() => {
          _setMove(move[0], move[1])
        }, AI_MOVE_DELAY - timeDifference);
      } else {
        _setMove(move[0], move[1]);
      }
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
  
  document.querySelector('#modal-submit')
    .addEventListener('click', () => {
      const p1Select = document.querySelector('#p1-select');
      const p2Select = document.querySelector('#p2-select');

      if (p1Select.value === "human") {
        PLAYER_1.isAIAgent = false;
      } else {
        PLAYER_1.isAIAgent = true;

        switch (p1Select.value) {
          case "ai-easy":
            PLAYER_1.difficulty = AIAgent.EASY;
            break;
          case "ai-medium":
            PLAYER_1.difficulty = AIAgent.MEDIUM;
            break;
          case "ai-hard":
            PLAYER_1.difficulty = AIAgent.HARD;
            break;
          case "ai-impossible":
            PLAYER_1.difficulty = AIAgent.IMPOSSIBLE;
            break;
        }
      }

      if (p2Select.value === "human") {
        PLAYER_2.isAIAgent = false;
      } else {
        PLAYER_2.isAIAgent = true;

        switch (p2Select.value) {
          case "ai-easy":
            PLAYER_2.difficulty = AIAgent.EASY;
            break;
          case "ai-medium":
            PLAYER_2.difficulty = AIAgent.MEDIUM;
            break;
          case "ai-hard":
            PLAYER_2.difficulty = AIAgent.HARD;
            break;
          case "ai-impossible":
            PLAYER_2.difficulty = AIAgent.IMPOSSIBLE;
            break;
        }
      }

      document.querySelector("#modal-menu").style.display = 'none';

      resetGame();
  });

  document.querySelector('#modal-cancel')
    .addEventListener('click', () => {
      document.querySelector("#modal-menu").style.display = 'none';
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
