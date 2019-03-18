import React from 'react';

class ChooseDifficulty extends React.Component {
  render() {
    return (
      <div>
        <div class="row margin-top-btm-5 center-content">
          <h4 class="center-text">Choose Difficulty</h4>
        </div>
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
      </div>
    );
  }
}

export default ChooseDifficulty;