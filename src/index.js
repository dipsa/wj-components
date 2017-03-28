import AlertsContainer from './components/alerts/AlertsContainer';
import reducer, {
  actions,
  types,
  loadAlerts,
  loadAlertsAjaxSuccess,
  loadAlertsForPage,
  loadAlertsForPageAjaxSuccess,
  markAlertReadForSession,
  removeAlertsFromStore
} from './store/alerts';

export {
  // all action creators
  actions,
  // all action types
  types,
  // reducer
  reducer,
  //action creators seperately
  loadAlerts,
  loadAlertsAjaxSuccess,
  loadAlertsForPage,
  loadAlertsForPageAjaxSuccess,
  markAlertReadForSession,
  removeAlertsFromStore
};

export default AlertsContainer;
