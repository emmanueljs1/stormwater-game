import React from 'react';
import Block from './Block';
import { blockColors } from '../utils';

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

  handleClick(i, j) {
    const numrows = this.props.numrows;
    var newboard = this.state.board;
    newboard[i * numrows + j][1] = !newboard[i * numrows + j][1];
    this.setState({
      board: newboard,
      selected: newboard[i * numrows + j]
    });
  }

  render() {
    var rows = [];
    const numrows = this.props.numrows;
    const numcols = this.props.numcols;

    for (var i = 0; i < numrows; i++) {
      var cols = [];
      for (var j = 0; j < numcols; j++) {
        let blockinfo = this.state.board[i * numrows + j];
        let blocktype = blockinfo[0];
        let row = i;
        let col = j;

        cols.push(<Block height={this.props.height / numrows}
                          isGreen={blockinfo[1]}
                          greenColor={blockColors[blocktype].greenColor}
                          grayColor={blockColors[blocktype].grayColor}
                          onClick={() => this.handleClick(row, col)}/>);
        }

      rows.push(<div class="row">{cols}</div>);
    }

    return (
      <div className="row">
        <div className="col-sm-9" style={{height: this.props.height}}>
          {rows}
        </div>
        <div class="col-sm-3 light-green">
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-10" style={{textAlign: 'center'}}>
              { this.state.selected == null ? 'Select a rectangle to the left!' : 'Options:' }
            </div>
            <div class="col-sm-1"></div>
          </div>
          <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
            {
              /* TODO: develop into menu UI for changing selected block into a green infrastructure block */
              this.state.selected == null ? null : this.state.selected[0]
            }
            </div>
            <div class="col-sm-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
