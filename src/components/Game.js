import React from 'react';
import Board from './Board';

class Game extends React.Component {
  render() {
    return (
      <div class="game">
        <div class="row">
          <div style={{margin: "0 auto"}}>
            <h2 style={{color: 'white'}}>Stormwater Game{/* TODO: better title */}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <Board height={this.props.height} numrows={20} numcols={20}/>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="row">
          <div class="light-gray">
            { /* TODO: legend and instructions */ }
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
