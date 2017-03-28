import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import AlertDismissable from './AlertDismissable';
import {  loadAlertsForPage,
          markAlertReadForSession,
          removeAlertsFromStore } from '../stroe/alerts';

import config from '../../config/commonConfig.json';

class AlertsContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { loadAlertsForPage, page } = this.props;

    loadAlertsForPage({
      page: page,
      tenant: config.tenant,
      lancode : config.defaultLanguage
    });
  }

  componentWillUnmount() {
    this.props.removeAlertsFromStore();
  }

  isAlertAlreadyClosed(alertId) {
    if (cookie.load(alertId)) {
      return true;
    }

    return false;
  }

  dismissAlert(alertId) {
    cookie.save(alertId, alertId, { path: '/', maxAge: 86400}); // this cookie will be expired in a day
    this.props.markAlertReadForSession(alertId);
  }

  render() {
    const { alerts } = this.props;
    let dismissableAlerts;

    if (alerts && Array.isArray(alerts)) {
      dismissableAlerts = alerts.filter(alert => {
        if (alert.isVisible && !this.isAlertAlreadyClosed(alert.id)) { return alert; }
      }).map(alert => {
        return <AlertDismissable key={alert.id} alert={alert} onDismiss={() => this.dismissAlert(alert.id)} />;
      });
    }

    return (
      <div className="alert-container">
        <ReactCSSTransitionGroup
          transitionName="alert"
          transitionAppear={false}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {dismissableAlerts}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

AlertsContainer.propTypes = {
  alerts: PropTypes.array,
  markAlertReadForSession: PropTypes.func.isRequired,
  loadAlertsForPage: PropTypes.func.isRequired,
  removeAlertsFromStore: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    alerts: state.alerts.alerts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadAlertsForPage,
    markAlertReadForSession,
    removeAlertsFromStore
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsContainer);
