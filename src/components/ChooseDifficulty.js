import React from 'react';

class ChooseDifficulty extends React.Component {
  render() {
    return (
      <div class="margin-left-right-20">
        <div class="row margin-top-btm-5 center-content">
          <h4 class="center-text">Choose Difficulty</h4>
        </div>
        {
          this.props.withWarning 
          ?
            <div class="row margin-top-btm-5 margin-left-right-5 center-content">
              <h5 class="center-text" style={{color: 'red'}}>
                WARNING: Changing the difficulty will reset your board
              </h5>
            </div>
          :
            null
        }
        <div class="row margin-top-btm-5 center-content">
          <button type="button"
                  class="btn btn-success"
                  onClick={this.props.chooseEasy}>
            Easy
          </button>
        </div>
        <div class="row margin-top-btm-5 center-content">
          <button type="button"
                  class=" btn btn-warning"
                  onClick={this.props.chooseMedium}>
            Medium
          </button>
        </div>
        <div class="row margin-top-btm-5 center-content">
          <button type="button"
                  class="btn btn-danger"
                  onClick={this.props.chooseHard}>
            Hard
          </button>
        </div>
        {
          this.props.close 
          ?
            <div>
              <div class="row margin-top-btm-5">
                <div class="col-sm-9"></div>
                <div class="col-sm-2">
                  <button type="button"
                          class="btn btn-dark"
                          onClick={this.props.close}>
                    Cancel
                  </button>
                </div>
                <div class="col-sm-1"></div>
              </div>
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default ChooseDifficulty;