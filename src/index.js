import ComponentManager from './components/ComponentManager';
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

export default ComponentManager;
