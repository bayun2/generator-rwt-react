import React from 'react';
import styles from './App.less';

class App extends React.Component {
  state = {
    get: {},
    getList: [],
    postData: {}
  }
  componentDidMount() {
    console.log(this.props);
  }
  getData = () => {
    fetch('/fdt/api/demo/get')
      .then(res => res.json())
      .then(({meta, data, message}) => {
        if (meta.code !== 200) {
          return window.fdt.superDialog({
            content: message,
            buttons: JSON.stringify(['确认'])
          });
        }
        this.setState({get: data});
      })
      .catch(() => {
        window.fdt.superDialog({
          content: '网络错误，请刷新重试',
          buttons: JSON.stringify(['确认'])
        });
      });
  }
  getList = () => {
    fetch('/fdt/api/demo/getlist?l=5')
      .then(res => res.json())
      .then(({meta, data, message}) => {
        if (meta.code !== 200) {
          return window.fdt.superDialog({
            content: message,
            buttons: JSON.stringify(['确认'])
          });
        }
        this.setState({getList: data});
      })
      .catch(() => {
        window.fdt.superDialog({
          content: '网络错误，请刷新重试',
          buttons: JSON.stringify(['确认'])
        });
      });
  }
  postData = () => {
    fetch('/fdt/api/demo/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: '张三', passwword: '123456'})
    })
      .then(res => res.json())
      .then(({meta, data, message}) => {
        if (meta.code !== 200) {
          return window.fdt.superDialog({
            content: message,
            buttons: JSON.stringify(['确认'])
          });
        }
        this.setState({postData: data});
      })
      .catch(() => {
        window.fdt.superDialog({
          content: '网络错误，请刷新重试',
          buttons: JSON.stringify(['确认'])
        });
      });
  }
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.group}>
          <div className={styles.value}>{`数据: ${JSON.stringify(this.state.get)}`}</div>
          <div className={styles.button} onClick={this.getData}>{'获取数据'}</div>
        </div>

        <div className={styles.group}>
          <div className={styles.value}>{`列表: ${JSON.stringify(this.state.getList)}`}</div>
          <div className={styles.button} onClick={this.getList}>{'获取列表'}</div>
        </div>

        <div className={styles.group}>
          <div className={styles.value}>
            {`提交的数据: ${JSON.stringify(this.state.postData)}`}
          </div>
          <div className={styles.button} onClick={this.postData}>{'提交数据'}</div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {

};

App.propTypes = {

};

export default App;
