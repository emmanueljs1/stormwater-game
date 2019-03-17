import React from 'react';

class Block extends React.Component {
  render() {
    const bgColor = this.props.isGreen ? this.props.greenColor : this.props.grayColor;
    const h = this.props.height;

    return (
      <button className="col button" onClick={this.props.onClick} style={{backgroundColor: bgColor, height: h, outline: 'none'}}></button>
    );
  }
}

export default Block;
