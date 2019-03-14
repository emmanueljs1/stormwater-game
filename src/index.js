import React from 'react';
import ReactDOM from 'react-dom';
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
    const w = this.props.width
    const h = this.props.height

    return (
      <button className="roof" onClick={toggle} style={{backgroundColor: bgColor, width: w, height: h}}>
        {/* TODO add dropdown menu for options */}
      </button>
    )
  }
}

class Board extends React.Component {
  render() {
    var rows = []
    const numrows = 20
    const numcols = 20

    for (var i = 0; i < numrows; i++) {
      var cols = []
      for (var j = 0; j < numcols; j++) {
        cols.push(<Roof width={this.props.width / 20} height={this.props.height / 20} />)
      }
      rows.push(<div>{cols}</div>)
    }

    return (
      <div className="board" style={{width: this.props.width, height: this.props.height}}>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="centered">
          <h2 style={{color: 'white'}}>Stormwater Game {/* TODO: better title */}</h2>
        </div>
        <div className="centered">
          <div className="light-blue game-col">
            { /* TODO: instructions */ }
          </div>
          <Board width={this.props.width} height={this.props.height}/>
          <div className="light-green game-col">
            { /* TODO: */ }
          </div>
        </div>
        <div className="padding">
          <div className="light-gray">
            { /* TODO: legend */ }
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game width={1000} height={500}/>,
  document.getElementById('root')
);
