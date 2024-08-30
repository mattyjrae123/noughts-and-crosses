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
      _tiles[x][y] = undefined;
    }
  }

  const setTile = (row, col, player) => {
    if ((row < 0 || row > 2) || (col < 0 || col > 2)) {
      return;
    }

    _tiles[row][col] = player;
  };

  const getTile = (row, col) => {
    if ((row < 0 || row > 2) || (col < 0 || col > 2)) {
      return;
    }
    return _tiles[row][col];
  };

  const reset = () => {
    for (let row = 0; row < +_tiles.length; row++) {
      for (let col = 0; col < _tiles[0].length; col++) {
        _tiles[row][col] = undefined;
      }
    }
  }

  const refreshBoardUI = () => {
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const player = _tiles[row][col];
        document.querySelector(`.gameboard-tile[data-col="${col}"][data-row="${row}"]`).textContent = player;
      }
    }
  };

  const getPossibleMoves = () => {
    const moves = [];

    for (let row = 0; row < +_tiles.length; row++) {
      for (let col = 0; col < _tiles[0].length; col++) {
        if (_tiles[row][col] == undefined) {
          moves.push([row, col]);
        }
      }
    }

    return moves;
  };
  
  return {
    setTile,
    getTile,
    reset,
    refreshBoardUI,
    getPossibleMoves
  };
})();

export { board };
