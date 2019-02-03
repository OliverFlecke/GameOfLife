import React from "react";
import * as styles from "./Cell.module.scss";

interface CellProps {
  isAlive: boolean;
  toggle: () => void;
}

export class Cell extends React.PureComponent<CellProps> {
  public render() {
    return (
      <div
        onClick={this.props.toggle}
        className={this.props.isAlive ? styles.alive : styles.dead}
      />
    );
  }
}
