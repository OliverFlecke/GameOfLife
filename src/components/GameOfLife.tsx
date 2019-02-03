import React from 'react';
import { GameOfLifeGrid } from './GameOfLifeGrid';

export class GameOfLife extends React.PureComponent {
  public render() {
    return (
      <div>
        <GameOfLifeGrid size={20} updateInterval={1000} />
      </div>
    );
  }
}
