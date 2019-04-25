import React from 'react';

class Block extends React.Component {
  render() {
    const bgColor = this.props.isGreen ? this.props.greenColor : this.props.grayColor;
    const img = this.props.isGreen ? `green_${this.props.img}` : this.props.img;
    const bordCol = this.props.isSelected ? 'red' : bgColor;
    const h = this.props.height;
    const w = this.props.width;

    return (
      <button class="padding-0 col"
              onClick={this.props.onClick}
              style={{     
                borderColor: bordCol,
                width: w,
                height: h,
                background: `${bgColor} url(images/${img}) no-repeat`,
                backgroundSize: this.props.bgSize,
                outline: 'none'
              }}>
      </button>
    );
  }
}

export default Block;
