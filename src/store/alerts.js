import AlertsApi from '../api/alertsApi';

// array to keep the alert objects
const INITIAL_STATE = {};

const LOAD_ALERTS = 'LOAD_ALERTS';
const LOAD_ALERTS_AJAX_SUCCESS = 'LOAD_ALERTS_AJAX_SUCCESS';
const LOAD_ALERTS_PER_PAGE = 'LOAD_ALERTS_PER_PAGE';
const LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS = 'LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS';
const MARK_ALERT_READ_FOR_SESSION = 'MARK_ALERT_READ_FOR_SESSION';
const REMOVE_ALERTS_FROM_STORE = 'REMOVE_ALERTS_FROM_STORE';

// This action is to load all the alerts once and keep them in the store.
// if page=by-page loading is required when loading all the alerts is cumbersome
// fallback to below loadAlertsForPage function
export function loadAlerts() {
  return function(dispatch) {
    return AlertsApi.loadAlertsMock().then((alerts) => {
      dispatch(loadAlertsAjaxSuccess(alerts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadAlertsAjaxSuccess(alerts) {
  return { type: LOAD_ALERTS_AJAX_SUCCESS, alerts };
}

//This action is to load all the alerts specific to a single page.
// Preferred way of loading alerts
export function loadAlertsForPage(params) {
  return function(dispatch) {
    return AlertsApi.loadAlertsForPageMock(params).then((alerts) => {
      dispatch(loadAlertsForPageAjaxSuccess(alerts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadAlertsForPageAjaxSuccess(alerts) {
  return { type: LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS, alerts };
}

// This action is responsible for marking the alert is read by the user and will hide it during the current session.
// Fallback for cookie disabled browsers.
export function markAlertReadForSession(alertId) {
  return { type: MARK_ALERT_READ_FOR_SESSION, alertId };
}

// This action is to flush the alerts from the store when the component unmounts from the DOM.
// Good Housekeeping.
export function removeAlertsFromStore() {
  return { type: REMOVE_ALERTS_FROM_STORE };
}

export const actions = {
  loadAlerts,
  loadAlertsAjaxSuccess,
  loadAlertsForPage,
  loadAlertsForPageAjaxSuccess,
  markAlertReadForSession,
  removeAlertsFromStore
};

export const types = {
  LOAD_ALERTS,
  LOAD_ALERTS_AJAX_SUCCESS,
  LOAD_ALERTS_PER_PAGE,
  LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS,
  MARK_ALERT_READ_FOR_SESSION,
  REMOVE_ALERTS_FROM_STORE
}

// Aerts Reducer
export default () => {
  return (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOAD_ALERTS_AJAX_SUCCESS:
        return Object.assign({}, state, { alerts: action.alerts });
      case LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS:
        return Object.assign({}, state, { alerts: action.alerts });
      case MARK_ALERT_READ_FOR_SESSION: {
        const newAlerts = state.alerts.map(alert => {
          if (alert.id === action.alertId) {
            return Object.assign({}, alert, { isVisible: false });
          }
          else {
            return alert;
          }
        });

        return Object.assign({}, state, { alerts: newAlerts });
      }
      case REMOVE_ALERTS_FROM_STORE:
        return [];

      default:
        return state;
    }
  }
}

// export default function alertsReducer(state = initialState, action) {
//
// }
