import React from 'react';
import Popup from 'reactjs-popup';
import Block from './Block';
import {
  blockColors,
  blockImages,
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
      // n x m board with [blockType, isGreen, row, col, img, bgPos, width, height]
      board: this.newBoard(),
      remainingBudget: budget(this.props.difficulty),
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    e.preventDefault();

    if (this.state.selected) {
      if (e.key === 'ArrowLeft' && this.state.selected[3] > 0) {
        this.selectBlock(this.state.selected[2], this.state.selected[3] - 1);
      }
      else if (e.key === 'ArrowRight' && this.state.selected[3] < this.props.numcols - 1) {
        this.selectBlock(this.state.selected[2], this.state.selected[3] + 1);
      }
      else if (e.key === 'ArrowUp' && this.state.selected[2] > 0) {
        this.selectBlock(this.state.selected[2] - 1, this.state.selected[3]);
      }
      else if (e.key === 'ArrowDown' && this.state.selected[2] < this.props.numcols - 1) {
        this.selectBlock(this.state.selected[2] + 1, this.state.selected[3]);
      }
      else if (e.key === 'Enter') {
        this.toggleBlock(this.state.selected[2], this.state.selected[3]);
      }
    }
  }

  newBoard() {
    let board = [];
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;

    let split = blockstr.split(' ');

    for (let i = 0; i < numrows; i++) {
      for (let j = 0; j < numcols; j++) {
        let imgFile = null;
        let bgPos = 'center';
        let blocktype = blockTypes[split[numrows * i + j]];
        let width = `${100 * (1 / numcols)}%`;
        let height = this.props.height / numrows;

        if (blocktype === 'roof' && (i === 1 || i === 2 || i === 7 || i === 8)) {
          width = '124px';
        }

        if (blocktype === 'alley') {
          width = '42px'
        }

        if (blocktype === 'street') {
          if (i === 0 && j === 0) {
            imgFile = blockImages[blocktype]['NW'];
            bgPos = 'right';
          }
          else if (i === 0 && j === numcols - 1) {
            imgFile = blockImages[blocktype]['NE'];
            bgPos = 'left';
          }
          else if (i === numrows - 1 && j === 0) {
            imgFile = blockImages[blocktype]['SW'];
            bgPos = 'right';
          }
          else if (i === numrows - 1 && j === numcols - 1) {
            imgFile = blockImages[blocktype]['SE'];
            bgPos = 'left';
          }
          else if (i === 0 || i === numrows - 1) {
            imgFile = blockImages[blocktype]['H'];
          }
          else if (j === 0) {
            imgFile = blockImages[blocktype]['VW'];
            bgPos = 'right';
          }
          else if (j === numcols - 1) {
            imgFile = blockImages[blocktype]['VE'];
            bgPos = 'left';
          }
        }
        else if (blocktype === 'roof') {
          imgFile = blockImages[blocktype];
        }
        else if (blocktype === 'plot of grass') {
          imgFile = blockImages[blocktype];
        }

        board.push([blocktype, false, i, j, imgFile, bgPos, width, height]);
      }
    }

    return board;
  }

  reset() {
    this.setState({
      board: this.newBoard(),
      remainingBudget: budget(this.props.difficulty),
      selected: null
    });
  }

  checkForPathFromStreetToParking() {
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;

    let seen = {};

    let searchForParking = (row, col) => {
      if (seen[row]) {
        seen[row].add(col);
      }
      else {
        seen[row] = new Set([col]);
      }
      let pathFound = false;

      for (let i = Math.max(0, row - 1); i < Math.min(numrows, row + 2); i++) {
        for (let j = Math.max(0, col - 1); j < Math.min(numcols, col + 2); j++) {
          if (!seen[i] || !seen[i].has(j)) {
            const blockinfo = this.state.board[i * numrows + j];
            const isGreen = blockinfo[1];
            const blocktype = blockinfo[0];

            if (blocktype === 'alley' && !isGreen) {
              pathFound = pathFound || searchForParking(i, j)
            }
            if (blocktype === 'lot') {
              return true;
            }
          }
        }
      }

      return pathFound;
    };

    for (let i = 0; i < numrows; i++) {
      for (let j = 0; j < numcols; j++) {
        const blockinfo = this.state.board[i * numrows + j];
        const blocktype = blockinfo[0];
        const row = i;
        const col = j;
        
        if (blocktype === 'street') {
          if (searchForParking(row, col)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  calculateResult() {
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;
    const remainingBudget = this.state.remainingBudget;

    let pointAdjustments = new Map();
    let stormwaterAbsorbed = 0;
    let hasParkingSpace = false;
    let expensiveOptionsUsed = 0

    for (let i = 0; i < numrows; i++) {
      for (let j = 0; j < numcols; j++) {
        const blockinfo = this.state.board[i * numrows + j];
        const blocktype = blockinfo[0];
        const isGreen = blockinfo[1];

        if (isGreen || blocktype === 'plot of grass') {
          stormwaterAbsorbed += (1 / (numrows * numcols));

          if (greenBenefits[blocktype].includes('Nice area for community')) {
            pointAdjustments.set('Added a nice area for the community', 5);
          }
          if (greenDisadvantages[blocktype].includes('Expensive')) {
            expensiveOptionsUsed += 1;
          }
        }

        if (blocktype === 'lot') {
          hasParkingSpace = true;
        }
      }
    }

    if (expensiveOptionsUsed > 0) {
      pointAdjustments.set(`Used an expensive option on ${expensiveOptionsUsed} tile(s)`, -1 * expensiveOptionsUsed);
    }

    if (hasParkingSpace) {
      if (!this.checkForPathFromStreetToParking()) {
        pointAdjustments.set("Took away all routes from the street to the parking space", -25);
      }
    }
    else {
      pointAdjustments.set("Took away all of the block's parking space", -20);
    }

    if (remainingBudget > budget(this.props.difficulty) * 0.5) {
      pointAdjustments.set('Spent less than half of your budget!', 5);
    }

    let finalScore = Math.round(stormwaterAbsorbed * 100);

    pointAdjustments.forEach( (value) => {
      finalScore += value
    });

    return {
      finalScore: finalScore, 
      pointAdjustments: pointAdjustments
    };
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
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.difficulty !== this.props.difficulty) {
      this.setState({
        remainingBudget: budget(nextProps.difficulty),
        board: this.newBoard()
      });
    }
  }

  render() {
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;
    const selected = this.state.selected;
    const remainingBudget = this.state.remainingBudget;
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
        let imgFile = blockinfo[4];
        let bgPos = blockinfo[5];
        let width = blockinfo[6];
        let height = blockinfo[7];

        cols.push(<Block img={imgFile}
                         bgPos={bgPos}
                         bgSize={blocktype === 'roof' || blocktype === 'plot of grass' ? '100% auto' : null}
                         height={height}
                         width={width}
                         isGreen={blockinfo[1]}
                         isSelected={isSelected}
                         greenColor={blockColors[blocktype].greenColor}
                         grayColor={blockColors[blocktype].grayColor}
                         onClick={() => this.selectBlock(row, col)}/>);

        if (blockinfo[1] || blocktype === 'plot of grass') {
          absorbedStormwater += (1 / (numrows * numcols));
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

    const potentialResult = this.calculateResult();

    return (
      <div onKeyDown={this.handleKeyDown}>
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
          <div class="col" style={{height: this.props.height, width: this.props.width}}>
            {rows}
          </div>
          {/* Toolbar */}
          <div class="col-sm-3 light-green center-content" style={{overflowY: 'scroll'}}>
            <div class="row margin-left-right-5 center-content">
              <div class="margin-top-btm-10 margin-left-right-5">
                <div class="row margin-top-btm-5 center-content center-text">
                  <div class="col center-text">
                    {
                      !selected
                      ?
                        'Select a tile from the city block!'
                      :
                        <p style={{marginBottom: 0}}>
                          You have selected {['a', 'e', 'i', 'o', 'u'].includes(selectedName[0]) ? 'an' : 'a' } <b>{selectedName.toUpperCase()}</b>
                        </p>
                    }
                  </div>
                </div>
                <div class="row margin-top-btm-5 center-content">
                  <div class="row center-content center-text">
                    <div class="col center-text">
                      {
                        selected
                        ?
                          selectedAlternative
                          ?
                            null
                          :
                            "Your selection already absorbs stormwater, so there's no need to change it!"
                        :
                          null
                      }
                    </div>
                  </div>
                </div>
                <div class="row margin-top-btm-5">
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
                </div>
                <div class="row center-content">
                  <button type="button"
                          class="btn btn-dark btn-sm margin-left-right-20 margin-top-btm-5"
                          onClick={() => this.reset()}>
                    Reset city block
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row center-content margin-left-right-5 margin-top-btm-5">
          <Popup trigger={<button type="button" class="btn btn-success centered">
                            Finish and get your results!
                          </button>}
                  modal
                  closeOnDocumentClick>
            { close => (
              <div class="center-content center-text margin-left-right-5 margin-top-btm-5">
                <h3>Your Score: {potentialResult.finalScore}%</h3>
                <h5 style={{color: "green"}}>
                  Stormwater Absorbed: {Math.round(100 * absorbedStormwater)}%
                </h5>
                {
                  Array.from(potentialResult.pointAdjustments).map(([key,value]) =>
                    <h5 style={{color: value > 0 ? "green" : "red"}}>
                      {key}: {value}%
                    </h5>
                  )
                }
                <div class="row margin-top-btm-5 margin-left-right-5">
                  <div class="col center-content">
                    <button type="button" 
                            class="btn btn-dark centered"
                            onClick={() => close()}>
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    );
  }
}

export default Board;
