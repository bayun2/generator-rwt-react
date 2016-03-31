import './reset.less';

import React from 'react';
import { connect } from 'react-redux';
import { fetchMainInfo, changeReward } from './actions';

class ActivityChange extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { fetchMainInfo } = this.props;
    fetchMainInfo();
  }

  render() {
    return (
      <div>
        <div className="m-activity-banner">
          <img alt="11" src={this.props.other.logo} />
          <p>描述：{this.props.other.description}</p>
          <p>头像{this.props.user.avatar}</p>
          <p>现金：{this.props.user.cash}</p>
          { this.props.rewards.length > 0 && <p>第一个商品描述：{this.props.rewards[0].description}</p> }
          <button onClick={this.props.changeReward.bind(this, 2)}>改变第一个商品描述的内容</button>
        </div>
      </div>
    );
  }
}

ActivityChange.defaultProps = {

}

ActivityChange.propTypes = {
  fetchMainInfo: React.PropTypes.func.isRequired,
  changeReward: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { user, rewards, other } = state;
  return {
    other: state.other,
    rewards: state.rewards,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMainInfo: function() {
      dispatch(fetchMainInfo());
    },
    changeReward: function(index) {
      dispatch(changeReward(index));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityChange);
