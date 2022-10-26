"use strict";

/**
 * board singleton
 * 
 * Stores gameboard tiles and has public and private methods for interacting
 * with the gameboard.
 */
const board = (() => {
  const _tiles = [[], [], []];

  for (let x = 0; x < 3; x += 1) {
    for (let y = 0; y < 3; y += 1) {
      _tiles[x][y] = {
        element: document.querySelector(`.gameboard-tile[data-col="${x}"][data-row="${y}"]`),
        player: undefined
      };
    }
  }

  const setTile = (x, y, player) => {
    if ((x < 0 || x > 2) || (y < 0 || y > 2)) {
      return;
    }

    const tile = _tiles[x][y];

    _tiles[x][y].player = player;
    _tiles[x][y].element.textContent = player;
  };

  const getTile = (x, y) => {
    return _tiles[x][y].player;
  };

  const reset = () => {
    _tiles.forEach((col) => {
      col.forEach((tile) => {
        tile.player = undefined;
        tile.element.textContent = '';
      });
    });
  }
  return {
    setTile,
    getTile,
    reset
  };
})();

/**
 * manager singleton
 * 
 * Sets up game and manages interaction between two players. Keeps track of
 * players turns and result etc.
 */
const manager = (() => {
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