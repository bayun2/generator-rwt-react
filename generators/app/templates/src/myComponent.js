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
        <div>123</div>
    );
  }
}

MyComponent.defaultProps = {

}

MyComponent.propTypes = {

}

export default MyComponent;
