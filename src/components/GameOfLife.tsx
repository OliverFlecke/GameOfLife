import React from "react";
import { Cell } from "./Cell";
import * as styles from "./GameOfLife.module.scss";

interface GameOfLifeProps {
  size: number;
}

interface GameOfLifeState {
  cells: boolean[][];
}

export class GameOfLife extends React.Component<
  GameOfLifeProps,
  GameOfLifeState
> {
  public constructor(props: GameOfLifeProps) {
    super(props);

    this.state = {
      cells: new Array(this.props.size)
        .fill(null)
        .map(() => new Array(this.props.size).fill(null).map(() => false)),
    };
  }

  public render() {
    console.info("GameOfLife: Render");

    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {this.state.cells.map((row: boolean[], y: number) => (
            <div key={y} className={styles.row}>
              {row.map((alive: boolean, x: number) => (
                <Cell key={x} isAlive={alive} toggle={this.toggleCell(x, y)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  private toggleCell(x: number, y: number) {
    return () => {
      const cells = this.state.cells;
      cells[y][x] = !cells[y][x];

      this.setState({ cells });
    };
  }
}
