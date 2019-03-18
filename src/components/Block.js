import React from 'react';

class Block extends React.Component {
  render() {
    const bgColor = this.props.isGreen ? this.props.greenColor : this.props.grayColor;
    const bordCol = this.props.isSelected ? 'red' : 'black';
    const h = this.props.height;

    return (
      <button class="col solid-border padding-0"
              onClick={this.props.onClick}
              style={{backgroundColor: bgColor, borderColor: bordCol, height: h, outline: 'none'}}>
      </button>
    );
  }
}

export default Block;
