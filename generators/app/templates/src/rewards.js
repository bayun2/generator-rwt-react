import React from 'react';
import ReactDOM from 'react-dom';
import ActivityReward from './reward';
import $ from 'zepto';

class Rewards extends React.Component {
  constructor(props) {
    super(props);

    this.changeAction = this.changeAction.bind(this);
  }

  changeAction(rewardId, leftCount, leftCash, code) {
    this.props.changeAction(rewardId, leftCount, leftCash, code);    
  }

  renderItems() {
    let items = this.props.rewards.map((reward) => {
      return (
        <ActivityReward
          activityId={this.props.activityId}
          authToken={this.props.authToken}
          changeAction={this.changeAction}
          key={reward.id}
          openModal={this.props.openModal}
          reward={reward} />
      );
    })
    return items;
  }

  render() {
    let items = this.renderItems();
    return (
      <div className="m-activity-rewards">
        <h3>奖品区</h3>
        <ul>{items}</ul>
      </div>
    );
  }
}

Rewards.defaultProps = {

}

Rewards.propTypes = {
  activityId: React.PropTypes.string,
  authToken: React.PropTypes.string,
  changeAction: React.PropTypes.func,
  openModal: React.PropTypes.func,
  rewards: React.PropTypes.array
}

module.exports = Rewards;
