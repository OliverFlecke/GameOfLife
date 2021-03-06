import React from 'react';
import { Cell } from './Cell';
import * as styles from './GameOfLifeGrid.module.scss';

interface GameOfLifeGridProps {
  size: number;
  updateInterval: number;
  isRunning: boolean;
}

interface GameOfLifeGridState {
  cells: boolean[][];
}

export class GameOfLifeGrid extends React.Component<
  GameOfLifeGridProps,
  GameOfLifeGridState
> {
  private timer?: NodeJS.Timeout;

  public constructor(props: GameOfLifeGridProps) {
    super(props);

    this.state = {
      cells: new Array(this.props.size)
        .fill(null)
        .map(() => new Array(this.props.size).fill(null).map(() => false)),
    };
  }

  public componentDidMount() {
    this.setInterval(this.props.updateInterval, this.props.isRunning);
  }

  public shouldComponentUpdate(nextProps: GameOfLifeGridProps): boolean {
    if (
      nextProps.updateInterval !== this.props.updateInterval ||
      nextProps.isRunning !== this.props.isRunning
    ) {
      if (this.timer) {
        clearInterval(this.timer!);
      }
      this.setInterval(nextProps.updateInterval, nextProps.isRunning);
    }

    return true;
  }

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>{this.renderGrid(this.state.cells)}</div>
      </div>
    );
  }

  private setInterval(interval: number, isRunning: boolean) {
    if (isRunning) {
      this.timer = setInterval(() => this.update(), interval);
    } else if (!isRunning && this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private renderGrid(cells: boolean[][]) {
    return this.state.cells.map((row: boolean[], y: number) => (
      <div key={y} className={styles.row}>
        {this.renderRow(row, y)}
      </div>
    ));
  }

  private renderRow(row: boolean[], y: number) {
    return row.map((alive: boolean, x: number) => (
      <Cell key={x} isAlive={alive} toggle={this.toggleCell(x, y)} />
    ));
  }

  private toggleCell(x: number, y: number) {
    return () => {
      const cells = this.state.cells;
      cells[y][x] = !cells[y][x];

      this.setState({ cells });
    };
  }

  private update() {
    const currentIteration = JSON.parse(JSON.stringify(this.state.cells));
    const nextIteration = JSON.parse(JSON.stringify(this.state.cells));

    currentIteration.forEach((row: boolean[], y: number) => {
      row.forEach((alive: boolean, x: number) => {
        const neighborsAlive = this.neighborsAlive(x, y, currentIteration);

        if (alive) {
          if (neighborsAlive < 2) {
            nextIteration[y][x] = false;
          } else if (neighborsAlive === 2 || neighborsAlive === 3) {
            nextIteration[y][x] = true;
          } else if (neighborsAlive > 3) {
            nextIteration[y][x] = false;
          }
        } else {
          if (neighborsAlive === 3) {
            nextIteration[y][x] = true;
          }
        }
      });
    });

    this.setState({ cells: nextIteration });
  }

  private neighborsAlive(x: number, y: number, cells: boolean[][]) {
    return this.neighbors(x, y)
      .map(([neighborX, neighborY]) => cells[neighborY][neighborX])
      .filter(living => living).length;
  }

  private neighbors(x: number, y: number): number[][] {
    const directions = [-1, 0, 1];

    return directions
      .filter(i => x + i >= 0 && x + i < this.props.size)
      .map(i =>
        directions
          .filter(j => y + j >= 0 && y + j < this.props.size)
          .filter(j => !(j === 0 && i === 0))
          .map(j => [x + i, y + j]),
      )
      .reduce((acc, current) => acc.concat(current), []);
  }
}
