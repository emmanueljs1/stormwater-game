import React from 'react';
import * as Scroll from 'react-scroll';
import { isMobile, MobileView } from 'react-device-detect';

class Instructions extends React.Component {
  render() {
    let infoHeight = isMobile ? '100px' : null;
    // let 

    return (
      <div class='margin-left-right-20'>
        <div class="row" style={{marginBottom: '10px'}}>
          <div class="col-sm-1"></div>
          <div class="col-sm-10">
            <h4>Background</h4>
            <Scroll.Element class="solid-border margin-top-btm-5" style={{height: infoHeight, overflow: 'scroll'}}>
              <p class="margin-left-right-5 margin-top-btm-0">
                This game gives you a city block with the challenge of adding green stormwater 
                infrastructure to it. <b>Green stormwater infrastructure (GSI)</b> is a cost-effective, 
                resilient approach to managing wet weather impacts that provides many community 
                benefits.<br></br><br></br>
                In other words, GSI is a different way to build a city block that focuses on helping 
                the city block reduce stormwater.<br></br><br></br>
                Why does reducing stormwater matter? Reducing stormwater is important because 
                otherwise that stormwater overflows the sewers. That means that the <i>dirty</i> water 
                in the sewers will have nowhere to go, so it will end up going to the rivers you get
                your drinking water from!
              </p>
            </Scroll.Element>
            <h4>How to play</h4>
            <Scroll.Element class="solid-border margin-top-btm-5" style={{height: infoHeight, overflow: 'scroll'}}>
              <p class="margin-left-right-5 margin-top-btm-0">
                Select a rectangle in the city block to see the options that you have for it. For example,
                if you select a <u>roof</u>, you have the option to switch it out for its GSI 
                counterpart, a <u>green roof</u>.<br></br><br></br>
                The goal of the game is to change the city block to use as much green infrastructure
                as you can without spending more than a certain budget, depending on if you're 
                playing on Easy, Medium, or Hard.
              </p>
            </Scroll.Element>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="row margin-left-right-5 margin-top-btm-5">
          <MobileView>Note: You can scroll in the blocks above!</MobileView>
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