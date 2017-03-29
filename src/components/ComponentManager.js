import React, { Component, PropTypes } from 'react';
import AlertsContainer from './alerts/AlertsContainer';
import * as ComponentTypes from '../constants/components';

class ComponentManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    
    switch (this.props.name) {
      case ComponentTypes.COMPONENT_ALERT:
        return (<AlertsContainer {...this.props} />);
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
