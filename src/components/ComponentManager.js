import React, { Component, PropTypes } from 'react';
import AlertsContainer from './alerts/AlertsContainer';

class ComponentManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.name) {
      case 'alert':
        return (<AlertsContainer {...props} />);
        break;
      default:
        return `No component found for the provided name: ${this.props.name}`;
    }
  }
}

ComponentManager.propTypes = {
  motif: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default ComponentManager;
