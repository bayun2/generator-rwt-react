import React from 'react';

class Reward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicking: false
    }
    this.changeAction = this.changeAction.bind(this);
  }

  changeAction(e) {
    e.preventDefault();
    if (!this.state.clicking && this.props.reward.leftCount !== 0) {
      let rewardId = this.props.reward.id;
      let changeData = {
        activityId: this.props.activityId,
        auth_token: this.props.authToken,
        rewardId: rewardId
      };
      var self = this;
      self.state.clicking = true;
      $.ajax({
        url:'/im/exchangeReward',
        type:'POST',
        dataType:'json',
        data: changeData,
        success: function(data) {
          self.state.clicking = false;
          if (data.meta.code === 200) {
            self.props.changeAction(rewardId, data.leftCount, data.leftCash, data.code);
          }
          self.props.openModal(data.meta.msg);
        },
        error: function() {
          self.state.clicking = false;
          self.props.openModal('网络不好~请刷新页面重试!');
        }
      });
    }
  }

  render() {
    let btnClass = this.props.reward.leftCount === 0 ?
    'changebtn j-change disabled' : 'changebtn j-change'
    return (
        <li className="reward">
          <div className="pic">
            <img src={this.props.reward.pic} />
          </div>
          <p className="name">{this.props.reward.name}</p>
          <p className="rewardinfo">
            <span className="cost">${this.props.reward.cost}</span>
            <span className="leftCount">剩余<em>{this.props.reward.leftCount}</em>件</span>
          </p>
          <a className={btnClass} onClick={this.changeAction}>兑换</a>
        </li>
    );
  }
}

Reward.defaultProps = {

}

Reward.propTypes = {
  activityId: React.PropTypes.string,
  authToken: React.PropTypes.string,
  changeAction: React.PropTypes.func,
  openModal: React.PropTypes.func,
  reward: React.PropTypes.object
}

module.exports = Reward;
