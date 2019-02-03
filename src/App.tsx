import React, { Component } from 'react';
import * as styles from './App.module.scss';
import { GameOfLife } from './components/GameOfLife';

class App extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <h1>Conway's Game of Life</h1>
        <GameOfLife />
      </div>
    );
  }
}

export default App;
