import React from 'react';
import Modal from 'react-modal';

class Userinfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user ? this.props.user : {
        avatar:'http://forexmaster.oss-cn-beijing.aliyuncs.com/fdt_hz%2Fdefault_head_img%402x.png',
        cash:100000,
        code:'你还没有兑换奖品,快去兑换吧',
        exFlag:0,
        leftCash:0,
        school:'未知学校',
        userName: '游客',
        verify:0
      },
      clickCount:0,
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openCodeModal = this.openCodeModal.bind(this);
    this.getReward = this.getReward.bind(this);
    this.openToast = this.openToast.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let user =  nextProps.user ? nextProps.user : {
      avatar:'http://forexmaster.oss-cn-beijing.aliyuncs.com/fdt_hz%2Fdefault_head_img%402x.png',
      cash:100000,
      code:'你还没有兑换奖品,快去兑换吧',
      exFlag:0,
      leftCash:0,
      school:'未知学校',
      userName: '游客',
      verify:0
    }
    this.setState({
      user: user
    })
  }

  preventScroll(e) {
    e.preventDefault();
  }

  openModal() {
    $('.ReactModalPortal').on('touchmove', this.preventScroll);
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    $('.ReactModalPortal').off('touchmove', this.preventScroll);
    this.setState({modalIsOpen: false});
  }

  openCodeModal() {
    let self = this;
    if (self.state.user.exFlag !== 1 ) { // 不是兑换过状态都不能领取
      return false;
    }
    if (self.clickFlag) {
      self.clickFlag = clearTimeout(self.clickFlag);
    }
    if (this.state.clickCount === 5) {
      self.state.clickCount = 0;
      this.openModal();
    } else {
      self.state.clickCount += 1;
      self.clickFlag = setTimeout(function() {
        self.state.clickCount = 0;
      }, 1000);
    }
  }

  openToast(msg) {
    let self = this;
    self.closeModal();
    this.setState({
      toastIsOpen: true,
      toastMsg: msg
    });
    setTimeout(function() {
      self.hideToast();
    }, 2000)
  }

  hideToast() {
    this.setState({toastIsOpen: false});
  }

  getReward() {
    let self = this;
    let data = {
      auth_token: this.props.authToken,
      code: this.state.user.code
    }
    $.ajax({
      url:'/im/fetchReward.json',
      type:'POST',
      dataType:'json',
      data: data,
      success: function(data) {
        if (data.meta.code === 200) {
          self.state.user.exFlag = 2;
          self.setState({
            user:self.state.user
          })
        }
        self.openToast(data.meta.msg);
      },
      error: function() {
        self.openToast('网络不好~请刷新页面重试!');
      }
    });
  }

  render() {
    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(31, 31, 31, 0.77)'
      },
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        borderRadius: '9px',
        width:'228px',
        padding: '25px 25px 9px'
      }
    };
    const toastStyles = {
      overlay: {
        backgroundColor: 'rgba(31, 31, 31, 0)'
      },
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        textAlign: 'center',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        border: '0px',
        borderRadius: '9px',
        padding: '25px 25px 25px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff'
      }
    };
    return (
      <div className="m-activity-userinfo">
        <div className="up">
          <div className="avatar">
            <img src={this.state.user.avatar} />
          </div>
          <div className="right">
            <p className="username">{this.state.user.userName}</p>
            <p className="school">{this.state.user.school}
              <i className={this.state.user.verify === 0 ? 'unverify' : 'verify'}></i>
            </p>
          </div>
        </div>
        <div className="mid">
          <div className="left">
            <p className="price cash">{this.state.user.cash}美元</p>
            <p className="info">外汇总资产</p>
          </div>
          <div className="right">
            <p className="price leftCash">{this.state.user.leftCash}美元</p>
            <p className="info">当前可兑换额度</p>
          </div>
        </div>
        <div className="bottom" onTouchStart={this.openCodeModal}>
          <div className={this.state.user.exFlag === 2 ? 'code disabled' : 'code'}>{this.state.user.code}</div>
          <p>我的兑换码</p>
        </div>
        <Modal
          className="code-dialog"
          isOpen={this.state.modalIsOpen}
          onRequesetClose={this.closeModal}
          style={customStyles}>
            <p>我的兑换码:{this.state.user.code}</p>
            <a onClick={this.getReward}>领取</a>
        </Modal>
        <Modal
          className="toast"
          isOpen={this.state.toastIsOpen}
          onRequesetClose={this.hideToast}
          style={toastStyles}>
            <p>{this.state.toastMsg}</p>
        </Modal>
      </div>
    );
  }
}

Userinfo.defaultProps = {

}

Userinfo.propTypes = {
  authToken: React.PropTypes.string,
  user: React.PropTypes.object
}

module.exports = Userinfo;
