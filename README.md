# Conway's Game of Life

Conway's Game of Life implemented in React with TypeScript.

## Rules of the game

The state of each cell only depends on the state from itself and it's neighbors in the past iteration.
Neighbors of a cell is every cell that are horizontally, vertically or diagonally adjacent to the cell.
The cell's state in the next iteration is determined by the following rules:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

It is currently only working with a predetermined grid size, where as the real game should be able to expand indefinitely in any direction.

## Development

The project is running on node and can be run and build with the usual commands.

To start the development server

```bash
npm start
```

To build the project

```bash
npm run build
```

To deploy the project

```bash
npm run deploy
```