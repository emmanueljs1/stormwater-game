import React from 'react';
import * as Scroll from 'react-scroll';
import Block from './Block';
import {
  blockColors,
  blockstr,
  blockTypes,
  budget,
  greenAlternatives,
  greenBenefits,
  greenDescriptions,
  greenDisadvantages,
  cityBlockSqFt,
  cost
} from '../utils';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.newBoard(),
      remainingBudget: budget(this.props.difficulty),
    };
  }

  newBoard() {
    let board = [];
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;

    let split = blockstr.split(' ');

    for (let i = 0; i < numrows; i++) {
      for (let j = 0; j < numcols; j++) {
        board.push([blockTypes[split[numrows * i + j]], false, i, j]);
      }
    }

    return board;
  }

  deselectBlock() {
    this.setState({
      selected: null
    });
  }

  selectBlock(i, j) {
    const numrows = this.props.numrows;
    this.setState({
      selected: this.state.board[i * numrows + j]
    });
  }

  toggleBlock(i, j) {
    const numrows = this.props.numrows;
    const blockSqFt = Math.round(Math.sqrt(cityBlockSqFt) / numrows);
    const remainingBudget = this.state.remainingBudget;

    const block = this.state.board[i * numrows + j];

    let newRemainingBudget = remainingBudget + (block[1] ? 1 : -1) * cost(blockSqFt, block[0]);
    let newBoard = this.state.board;

    if (newRemainingBudget >= 0) {
      newBoard[i * numrows + j][1] = !newBoard[i * numrows + j][1]; // toggle isGreen
    }
    else {
      newRemainingBudget = remainingBudget;
    }

    this.setState({
      board: newBoard,
      remainingBudget: newRemainingBudget,
      selected: null
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.difficulty !== this.props.difficulty) {
      this.setState({
        remainingBudget: budget(nextProps.difficulty),
      });
    }
  }

  render() {
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;
    const selected = this.state.selected;
    const remainingBudget = this.state.remainingBudget;
    const blockheight = this.props.height / numrows;
    const blockSqFt = Math.round(Math.sqrt(cityBlockSqFt) / numrows);

    let rows = [];
    let absorbedStormwater = 0;

    for (let i = 0; i < numrows; i++) {
      let cols = [];
      for (let j = 0; j < numcols; j++) {
        const blockinfo = this.state.board[i * numrows + j];
        const blocktype = blockinfo[0];
        const row = i;
        const col = j;
        const isSelected = selected && selected[2] === row && selected[3] === col;

        cols.push(<Block height={blockheight}
                         isGreen={blockinfo[1]}
                         isSelected={isSelected}
                         greenColor={blockColors[blocktype].greenColor}
                         grayColor={blockColors[blocktype].grayColor}
                         onClick={() => this.selectBlock(row, col)}/>);

        if (blockinfo[1] || blockinfo[0] === 'plot of grass') {
          absorbedStormwater += (1 / (numrows * numcols))
        }
      }

      rows.push(<div class="row">{cols}</div>);
    }

    const selectedIsGreen = !selected ? null : selected[1];

    const selectedName = !selected        ?                           null :
                         !selectedIsGreen ?                    selected[0] :
                                            greenAlternatives[selected[0]] ;

    const selectedAlternative = !selected        ?                           null :
                                 selectedIsGreen ?                    selected[0] :
                                                   greenAlternatives[selected[0]] ;

    const hasEnoughMoney = !selected ? null : (remainingBudget + (selectedIsGreen ? 1 : -1) * cost(blockSqFt, selected[0])) >= 0;

    return (
      <div>
        <div class="row margin-left-right-5 light-gray">
          <div class="col-sm-4 center-text">
            <b>Difficulty:</b> {this.props.difficulty.toUpperCase()}
          </div>
          <div class="col-sm-4 center-text">
            <b>Stormwater Absorbed:</b> {Math.round(100 * absorbedStormwater)}%
          </div>
          <div class="col-sm-4 center-text">
            <b>Remaining Money:</b> ${remainingBudget}
          </div>
        </div>
        <div class="row margin-left-right-5">
          {/* City Block (Board) */}
          <div class="col-sm-9" style={{height: this.props.height}}>
            {rows}
          </div>
          {/* Toolbar */}
          <div class="col-sm-3 light-green">
            <Scroll.Element style={{height: this.props.height, overflow: 'scroll'}}>
              <div class="margin-top-btm-10 margin-left-right-5">
                <Scroll.Element class="margin-top-btm-5">
                  <div class="row">
                    <div class="col center-text">
                      {
                        !selected
                        ?
                          'Select a rectangle from the city block!'
                        :
                          'You have selected a ' + selectedName
                      }
                    </div>
                  </div>
                </Scroll.Element>
                <Scroll.Element class="margin-top-btm-5">
                  <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4">
                    {
                      selected
                      ?
                        <Block height={blockheight / 2}
                               isGreen={selectedIsGreen}
                               grayColor={blockColors[selected[0]].grayColor}
                               greenColor={blockColors[selected[0]].greenColor}/>
                      :
                        null
                    }
                    </div>
                    <div class="col-sm-4"></div>
                  </div>
                </Scroll.Element>
                <Scroll.Element class="margin-top-btm-5">
                  <div class="row">
                    <div class="col center-text">
                      {
                        selected
                        ?
                          selectedAlternative
                          ?
                            'These are your options for a ' + selectedName + ':'
                          :
                            "Your selection already absorbs stormwater, so there's no need to change it!"
                        :
                          null
                      }
                    </div>
                  </div>
                </Scroll.Element>
                <Scroll.Element class="margin-top-btm-5">
                {
                  selected && selectedAlternative
                  ?
                    <div class="row center-content margin-left-right-5">
                      <div class="solid-border">
                      {
                        hasEnoughMoney
                        ?
                          <div>
                            <div class="row center-content margin-top-btm-5">
                              <button type="button"
                                      class="btn btn-primary btn-sm margin-left-right-20"
                                      onClick={() => this.toggleBlock(selected[2], selected[3])}>
                                Change the {selectedName} {!selectedIsGreen ? 'to' : 'back to'} a {selectedAlternative}
                              </button>
                            </div>
                            {
                              !selectedIsGreen
                              ?
                                <div>
                                  <div class="row margin-top-btm-5">
                                    <div class="col center-text margin-left-right-5">
                                      <b>Description:</b><br></br>
                                      {greenDescriptions[selectedName]}
                                    </div>
                                  </div>
                                  <div class="row margin-top-btm-5">
                                    <div class="col center-text margin-left-right-5">
                                      <b>Benefits:</b><br></br>
                                      {
                                        greenBenefits[selectedName].map(txt =>
                                          <div class="row">
                                            <div class="col center-text">
                                              - {txt}
                                            </div>
                                          </div>
                                        )
                                      }
                                    </div>
                                  </div>
                                  <div class="row margin-top-btm-5">
                                    <div class="col center-text margin-left-right-5">
                                      <b>Disadvantages:</b><br></br>
                                      {
                                        greenDisadvantages[selectedName].map(txt =>
                                          <div class="row">
                                            <div class="col center-text">
                                              - {txt}
                                            </div>
                                          </div>
                                        )
                                      }
                                    </div>
                                  </div>
                                </div>
                              :
                                <div class="row margin-top-btm-5">
                                  <div class="col center-text margin-left-right-5">
                                    You can change this {selectedName} back to save money, or if you 
                                    decided the benefits weren't worth it after considering the 
                                    disadvantages
                                  </div>
                                </div>
                            }
                            <div class="row margin-top-btm-5">
                              <div class="col center-text">
                                <b>{!selectedIsGreen ? 'Cost' : 'Savings'}: </b>
                                ${cost(blockSqFt, selected[0])}
                              </div>
                            </div>
                          </div>
                        :
                          <div class="row center-text margin-top-btm-5 margin-left-right-5">
                            You don't have enough money to change the {selectedName} to a {selectedAlternative}
                          </div>
                      }
                      </div>
                      <button type="button"
                              class="btn btn-danger btn-sm margin-left-right-20 margin-top-btm-5"
                              onClick={() => this.deselectBlock()}>
                        Unselect the {selectedName}
                      </button>
                    </div>
                  :
                    null
                }
                </Scroll.Element>
                <Scroll.Element>
                  <div class="row center-content">
                    <button type="button"
                            class="btn btn-dark btn-sm margin-left-right-20 margin-top-btm-5"
                            onClick={() =>
                              this.setState({
                                board: this.newBoard(),
                                remainingBudget: budget(this.props.difficulty),
                                selected: null
                              })
                            }>
                      Reset city block
                    </button>
                  </div>
                </Scroll.Element>
              </div>
            </Scroll.Element>
          </div>
        </div>
        <div class="row margin-left-right-5 center-content margin-top-btm-5">
          <button type="button"
                  class="btn btn-success centered">
            Finish and get your results!
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
