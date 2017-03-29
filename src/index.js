import ComponentManager from './components/ComponentManager';
import { COMPONENT_ALERT } from './constants/components';
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
  removeAlertsFromStore,
  //component types
  COMPONENT_ALERT
};

export default ComponentManager;
