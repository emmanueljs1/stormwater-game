import React from 'react';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
        <Game height={this.props.height} width={this.props.width}/>
      </div>
    );
  }
}

export default App;
