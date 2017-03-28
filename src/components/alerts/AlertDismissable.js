/* eslint react/no-danger: 0 */
import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

class AlertDismissable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { alert, onDismiss } = this.props;

    const  alertClass = alert.type || 'default';

    return (
      <Alert onDismiss={onDismiss} bsClass={`alert alert-${alertClass}`}>
        <strong>{alert.title}: </strong>
        <span dangerouslySetInnerHTML={{__html: alert.message}} />
      </Alert>
    );

  }
}

AlertDismissable.propTypes = {
  alert: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default AlertDismissable;
