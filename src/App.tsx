import React, { Component } from "react";
import * as styles from "./App.module.scss";
import { GameOfLife } from "./components/GameOfLife";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <GameOfLife size={20} updateInterval={1000} />
      </div>
    );
  }
}

export default App;
