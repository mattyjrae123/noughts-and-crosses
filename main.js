"use strict";

/**
 * gameboard singleton
 * 
 * Stores gameboard tiles and has public and private methods for interacting
 * with the gameboard.
 */
const gameboard = (() => {
  const tiles = [[], [], []];

  for (let x = 0; x < 3; x+=1) {
    for (let y = 0; y < 3; y+=1) {
      tiles[x][y] = {element: document.querySelector(`.gameboard-tile[data-col="${x}"][data-row="${y}"]`),
                     player: undefined};
    }
  }

  const setTile = (x, y, player) => {
    if ((x < 0 || x > 2) || (y < 0 || y > 2)) {
      return;
    }

    const tile = tiles[x][y];

    if (player == null || tile.player != null) {
      return;
    }

    tiles[x][y].player = player;
    tiles[x][y].element.textContent = player;
  };

  return {setTile};
})();
