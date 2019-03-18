import React from 'react';
import Popup from 'reactjs-popup'
import Board from './Board';
import Instructions from './Instructions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: true
    };
  }

  render() {
    return (
      <div class="game">
        {
          this.state.startup
          ?
            // TODO: replace with difficulty choosing popup
            <Popup defaultOpen modal closeOnDocumentClick>
              { close => (<Instructions onClick={() => this.setState({startup: false})}/>) }
            </Popup>
          :
          null
        }
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
        <div class="row center-content margin-top-btm-5">
          <Popup trigger={<button type="button" class="btn btn-light btn-lg">Instructions</button>} 
                 modal 
                 closeOnDocumentClick>
            { close => (<Instructions onClick={() => close()}/>)}
          </Popup>
        </div>
      </div>
    );
  }
}

export default Game;
