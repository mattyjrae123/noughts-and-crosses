import { board } from "./board.js";

/**
 * manager singleton
 * 
 * Sets up game and manages interaction between two players. Keeps track of
 * players turns and result etc.
 */

 const manager = ((gameBoard = board) => {
  let _playing = false;
  let _movesRemaining = 0;
  let _currentPlayersTurn = undefined;

  const _resetGame = () => {
    board.reset();
    _playing = true;
    _movesRemaining = 9;
    _currentPlayersTurn = 'X';
  };

  const _changePlayer = () => {
    if (_currentPlayersTurn === 'X') {
      _currentPlayersTurn = 'O';
    } else {
      _currentPlayersTurn = 'X';
    }
  }

  document.querySelector('#reset-btn').addEventListener('click', () => {
    _resetGame();
  });

  const tiles = document.querySelectorAll('.gameboard-tile');

  tiles.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      const col = e.target.getAttribute('data-col');
      const row = e.target.getAttribute('data-row');

      if (board.getTile(col, row) !== undefined) {
        return;
      }
      board.setTile(col, row, _currentPlayersTurn);
      _changePlayer();
    });
  });

  _resetGame();

})();

export { manager };
