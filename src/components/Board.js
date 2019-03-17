import React from 'react';
import * as Scroll from 'react-scroll';
import Block from './Block';
import { blockColors, greenAlternatives } from '../utils';

class Board extends React.Component {
  constructor(props) {
    super(props);
    var board = []
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;

    /* TODO: add grass and lot options */
    for (var i = 0; i < numrows; i++) {
      for (var j = 0; j < numcols; j++) {
        if (i === 0 || j === 0 || i === numrows - 1 || j === numcols - 1) {
          board.push(['sidewalk', false, i, j]);
        }
        else {
          board.push(['roof', false, i, j]);
        }
      }
    }

    this.state = {
      board: board,
      selected: null
    };
  }

  selectBlock(i, j) {
    const numrows = this.props.numrows;
    this.setState({
      board: this.state.board,
      selected: this.state.board[i * numrows + j]
    });
  }

  toggleBlock(i, j) {
    const numrows = this.props.numrows;
    var newBoard = this.state.board;
    newBoard[i * numrows + j][1] = !newBoard[i * numrows + j][1];
    this.setState({
      board: newBoard,
      selected: this.state.selected
    });
  }

  render() {
    var rows = [];
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;
    const selected = this.state.selected;
    const blockheight = this.props.height / numrows;

    for (var i = 0; i < numrows; i++) {
      var cols = [];
      for (var j = 0; j < numcols; j++) {
        let blockinfo = this.state.board[i * numrows + j];
        let blocktype = blockinfo[0];
        let row = i;
        let col = j;
        let isSelected = selected && selected[2] === row && selected[3] === col;

        cols.push(<Block height={blockheight}
                         isGreen={blockinfo[1]}
                         isSelected={isSelected}
                         greenColor={blockColors[blocktype].greenColor}
                         grayColor={blockColors[blocktype].grayColor}
                         onClick={() => this.selectBlock(row, col)}/>);
        }

      rows.push(<div class="row">{cols}</div>);
    }

    let selectedName = !selected    ?                           null :
                       !selected[1] ?                    selected[0] :
                                      greenAlternatives[selected[0]] ;

    let selectedAlternative = !selected    ?                           null :
                               selected[1] ?                    selected[0] :
                                             greenAlternatives[selected[0]] ;

    return (
      <div class="row">
        {/* City Block (Board) */}
        <div class="col-sm-9" style={{height: this.props.height}}>
          {rows}
        </div>
        {/* Toolbar */}
        <div class="col-sm-3 light-green">
          <Scroll.Element style={{height: this.props.height, overflow: 'scroll'}}>
            <div class="margin-top-btm-10">
              <Scroll.Element class="margin-top-btm-5">
                <div class="row">
                  <div class="col center-text">
                    {
                      !selected
                      ?
                        'Select a rectangle to the left!'
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
                      <Block height={blockheight}
                             isGreen={selected[1]}
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
                      selected ? 'These are your options for a ' + selectedName + ':' : null
                    }
                  </div>
                </div>
              </Scroll.Element>
              <Scroll.Element class="margin-top-btm-5">
              {
                selected
                ?
                  <div class="row center-content margin-left-right-5">
                    <div class="solid-border">
                      <div class="row center-content margin-top-btm-5">
                        <button type="button"
                                class="btn btn-primary btn-sm margin-left-right-20"
                                onClick={() => this.toggleBlock(selected[2], selected[3])}>
                          Change the {selectedName} to a {selectedAlternative}
                        </button>
                      </div>
                      <div class="row margin-top-btm-5">
                        <div class="col center-text">
                          {
                            /* TODO:
                              information on green/gray option
                              amount of money saved/spent in getting this option
                            */
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                :
                  null
              }
              </Scroll.Element>
            </div>
          </Scroll.Element>
        </div>
      </div>
    );
  }
}

export default Board;