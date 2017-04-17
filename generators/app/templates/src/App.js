import React from 'react';
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
        {'1234'}
      </div>
    );
  }
}

App.defaultProps = {

};

App.propTypes = {

};

export default App;
