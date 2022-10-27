# noughts-and-crosses

[Link to live page](https://mattyjrae123.github.io/noughts-and-crosses/)

'Noughts & Crosses' or 'Tic Tac Toe' app, will be browser based and 2 player.
Aim is to practice JS factory function and module function patterns to encapsulate related code and minimise global code.

## Project Plan
### Javascript
- Encapsulate code into 2 areas.
  - Gameplay Management
  - Game Board/data

#### Gameplay Management
- GameManager object (use Module pattern)
  - data:
    - current players turn
    - moves left (0 - 9)
    - winner (?)
    - game currently playing (boolean)
    - GameBoard object
  - methods:
    - reset/restart game
    - end game (?)
    - set tile (for dom click listener to trigger)

#### Game Board/data
- GameBoard object
  - methods:
    - generate board
    - display board (?)
    - clear/delete Board
    - check rows for winner
    - set certain tile to current player (X or O)
- Array of 'Tile' objects (use factory pattern)
  - data:
    - current player
    - DOM element (?)
  - methods:
    - set current player
    - get current player
    - clear current player (?)
    - highlight tile (e.g. if tile is in a winning row)(?)
- Two 'Player' objects (use factory pattern) (?)
