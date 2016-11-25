import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.funcName = []
    this.funcName.forEach(funcName => {
      this[funcName] = this[funcName].bind(this);
    })
  }

  render() {
    return (
        <div></div>
    );
  }
}

MyComponent.defaultProps = {

}

MyComponent.propTypes = {

}

module.exports = MyComponent;
