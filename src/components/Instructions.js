import React from 'react';

class Instructions extends React.Component {
  render() {
    return (
      <div class='margin-left-right-20 margin-top-btm-5'>
        <div class="row" style={{marginBottom: '10px'}}>
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <h4>Background</h4>
            <div class="margin-top-btm-5" style={{overflowY: 'scroll'}}>
              <p class="margin-left-right-5 margin-top-btm-0">
                This game gives you a city block with the challenge of adding green stormwater 
                infrastructure to it. <b>Green stormwater infrastructure (GSI)</b> is a cost-effective, 
                resilient approach to managing wet weather impacts that provides many community 
                benefits.<br></br><br></br>
                Why does reducing stormwater matter? Reducing stormwater is important because 
                otherwise that stormwater overflows the sewers. That means that the <i>dirty</i> water 
                in the sewers will have nowhere to go, so it will end up going to the rivers you get
                your drinking water from!
              </p>
            </div>
            <h4>How to play</h4>
            <div class="margin-top-btm-5" style={{overflowY: 'scroll'}}>
              <p class="margin-left-right-5 margin-top-btm-0">
                Select a tile in the city block to see the options that you have for it. For example,
                if you select a <b>ROOF</b>, you have the option to switch it out for its GSI 
                counterpart, a <b>GREEN ROOF</b>.<br></br>
                The goal of the game is to change the city block to use as much green infrastructure
                as you can without spending more than a certain budget, depending on if you're 
                playing on Easy, Medium, or Hard.
              </p>
            </div>
          </div>
          <div class="col-sm-1"></div>
        </div>
        {
          this.props.onClick
          ?
            <div class="row margin-left-right-5 center-content">
              <button type="button" class="btn btn-secondary" onClick={this.props.onClick}>
                Done
              </button>
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default Instructions;