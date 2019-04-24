import React from 'react';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div>
        <Game height={this.props.height} width={this.props.width}/>
      </div>
    );
  }
}

export default App;
