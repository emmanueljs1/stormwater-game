import React from 'react';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div>
        <Game height={this.props.height}/>
      </div>
    );
  }
}

export default App;
