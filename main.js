"use strict";

/**
 * board singleton
 * 
 * Stores gameboard tiles and has public and private methods for interacting
 * with the gameboard.
 */
const board = (() => {
  const _tiles = [[], [], []];

  for (let x = 0; x < 3; x+=1) {
    for (let y = 0; y < 3; y+=1) {
      _tiles[x][y] = {element: document.querySelector(`.gameboard-tile[data-col="${x}"][data-row="${y}"]`),
                     player: undefined};
    }
  }

  const setTile = (x, y, player) => {
    if ((x < 0 || x > 2) || (y < 0 || y > 2)) {
      return;
    }

    const tile = _tiles[x][y];

    if (player == null || tile.player != null) {
      return;
    }

    _tiles[x][y].player = player;
    _tiles[x][y].element.textContent = player;
  };

  const reset = () => {
    _tiles.forEach((col) => {
      col.forEach((tile) => {
        tile.player = undefined;
        tile.element.textContent = '';
      });
    });
  }
  return {setTile,
          reset};
})();

/**
 * manager singleton
 * 
 * Sets up game and manages interaction between two players. Keeps track of
 * players turns and result etc.
 */
const manager = (() => {
  
})();
