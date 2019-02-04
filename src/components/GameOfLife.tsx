import React from 'react';
import * as styles from './GameOfLife.module.scss';
import { GameOfLifeGrid } from './GameOfLifeGrid';

interface GameOfLifeState {
  isRunning: boolean;
  speed: number;
}

export class GameOfLife extends React.PureComponent<{}, GameOfLifeState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      isRunning: false,
      speed: 500,
    };
  }

  public render() {
    return (
      <div>
        <GameOfLifeGrid
          size={20}
          updateInterval={this.state.speed}
          isRunning={this.state.isRunning}
        />
        <div className={styles.gameControls}>
          <button onClick={this.togglePause}>
            {this.state.isRunning ? 'Pause' : 'Start'}
          </button>
        </div>

        {this.renderGameRules()}
      </div>
    );
  }

  private togglePause = () => {
    this.setState({ isRunning: !this.state.isRunning });
  };

  private renderGameRules() {
    return (
      <div className={styles.gameRules}>
        <p>
          The state of each cell only depends on the state from itself and it's
          neighbors in the past iteration. Neighbors of a cell is every cell
          that are horizontally, vertically or diagonally adjacent to the cell.
        </p>
        <h3>
          The cell's state in the next iteration is determined by the following
          rules:
        </h3>
        <ol>
          <li>
            Any live cell with fewer than two live neighbors dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbors lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbors dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbors becomes a live cell,
            as if by reproduction.
          </li>
        </ol>
      </div>
    );
  }
}
