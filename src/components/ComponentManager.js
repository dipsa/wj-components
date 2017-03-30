import React, { Component, PropTypes } from 'react';
import AlertsContainer from './alerts/AlertsContainer';
import * as ComponentTypes from '../constants/components';
import motif from 'wj-motif';

class ComponentManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.name) {
      case ComponentTypes.COMPONENT_ALERT:
        return (<AlertsContainer motif={motif} {...this.props} />);
        break;
      default:
        return `No component found for the provided name: ${this.props.name}`;
    }
  }
}

ComponentManager.propTypes = {
  motif: PropTypes.object,
  name: PropTypes.string.isRequired
};

export default ComponentManager;
