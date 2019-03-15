import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class Roof extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGreen: false
    };
  }

  render() {
    const toggle = () => this.setState({isGreen: !this.state.isGreen})
    const bgColor = this.state.isGreen ? 'green' : 'gray'
    const h = this.props.height

    return (
      <button className="col roof" onClick={toggle} style={{backgroundColor: bgColor, height: h, outline: 'none'}}>
      </button>
      /* TODO: add dropdown menu for options */
    )
  }
}

/* TODO: add street, sidewalk, grass, lot classes */

class Board extends React.Component {
  render() {
    var rows = []
    const numrows = 20
    const numcols = 20

    for (var i = 0; i < numrows; i++) {
      var cols = []
      for (var j = 0; j < numcols; j++) {
        cols.push(<Roof height={this.props.height / numrows}/>)
      }
      rows.push(<div class="row">{cols}</div>)
    }

    return (
      <div className="board" style={{height: this.props.height}}>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div class="row">
          <div style={{margin: "0 auto"}}>
            <h2 style={{color: 'white'}}>Stormwater Game{/* TODO: better title */}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-8">
            <Board height={this.props.height}/>
          </div>
          <div class="light-green col-sm-2">
            Green Stormwater Infrastructure
            { /* TODO: information on GSI */ }
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="row">
          <div className="light-gray">
            { /* TODO: legend and instructions */ }
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game height={500}/>,
  document.getElementById('root')
);
