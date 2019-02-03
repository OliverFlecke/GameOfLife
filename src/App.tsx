import React, { Component } from "react";
import "./App.scss";
import { GameOfLife } from "./components/GameOfLife";

class App extends Component {
  render() {
    return <GameOfLife size={20} />;
  }
}

export default App;
