import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import MyComponent from './myComponent';

let pagePath, apiPath, apiSuffix;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'debugremote') {
  pagePath = 'wealth/page/newAccount/requestWitness';
  apiPath = `${location.protocol}//${location.host}/wealth/api/newAccount`;
  apiSuffix = '';
} else if (process.env.NODE_ENV === 'development') {
  pagePath = 'pages/index';
  apiPath = `${location.protocol}//${location.host}/data`;
  apiSuffix = '.json';
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.funcName = [];
    this.funcName.forEach(funcName => {
      this[funcName] = this[funcName].bind(this);
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

App.defaultProps = {

};

App.propTypes = {

};

const rootInstance = ReactDOM.render(<App/>, document.getElementById('J-activity'));

if (process.env.NODE_ENV === 'development') {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: () => [rootInstance]
  });
}
