import React from 'react';
import Popup from 'reactjs-popup';
import Board from './Board';
import Instructions from './Instructions';
import ChooseDifficulty from './ChooseDifficulty';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: null
    };
  }

  chooseDifficulty(difficulty, callback) {
    this.setState({difficulty: difficulty});

    if (callback) {
      callback();
    }
  }

  render() {
    const difficulty = this.state.difficulty;

    return (
      <div class="game">
        {
          !difficulty
          ?
            <Popup onClose={() => this.state.difficulty ? null : this.chooseDifficulty('hard')}
                   defaultOpen>
              { _ => (
                <div>
                  <div class="row">
                    <Instructions />
                  </div>
                  <div class="row center-content">
                    <ChooseDifficulty chooseEasy={() => this.chooseDifficulty('easy')}
                                      chooseMedium={() => this.chooseDifficulty('medium')}
                                      chooseHard={() => this.chooseDifficulty('hard')}/>
                  </div>
                </div>
              )}
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
            {
              difficulty
              ?
                <Board height={this.props.height}
                       numrows={20}
                       numcols={20}
                       difficulty={difficulty}/>
              :
                null
            }
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="row center-content margin-top-btm-5">
            <Popup trigger={<button type="button" class="btn btn-light btn-lg">
                              Instructions
                            </button>}
                  modal
                  closeOnDocumentClick>
              { close => (<Instructions onClick={() => close()}/>)}
            </Popup>
          </div>
        <div class="row center-content margin-top-btm-5">
            <Popup trigger={<button type="button" class="btn btn-light btn-lg">
                              Change Difficulty
                            </button>}
                   modal
                   closeOnDocumentClick>
              { close => (
                <ChooseDifficulty chooseEasy={() => this.chooseDifficulty('easy', close)}
                                  chooseMedium={() => this.chooseDifficulty('medium', close)}
                                  chooseHard={() => this.chooseDifficulty('hard', close)}/>
              )}
            </Popup>
        </div>
      </div>
    );
  }
}

export default Game;
