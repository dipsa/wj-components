import config from './config.js';
import delay from './delay';

import axios from 'axios';

//TODO: enhance the api calls with tenant, language and valid dates

const alerts = [
  {
    id: 1,
    page: 'home',
    type: 'info',
    title: 'Information',
    message: 'Just nu tar vi ej emot service i Malmö, då vi på grund av sjukdom inte har möjlighet att garantera våra servicetider. Vi ber om ursäkt för eventuella olägenheter det medför. Har du några frågor är du varmt välkommen att kontakta oss på telefon <a href="tel+46774102200">0774 10 2200</a> eller e-post <a href="mailto:service@lan-master.eu">service@lan-master.eu</a>.',
    langCode: 'sv',
    tenant: 'lanmaster',
  },
  {
    id: 2,
    page: 'home',
    type: 'success',
    title: 'Success',
    message: 'Success message Success message Success message Success message',
    langCode: 'sv',
    tenant: 'lanmaster'
  },
  {
    id: 3,
    page: 'home',
    type: 'danger',
    title: 'Error',
    message: 'Error message',
    langCode: 'en',
    tenant: 'lanmaster'
  },
  {
    id: 4,
    page: 'repair',
    type: 'info',
    title: 'Information',
    message: 'info message',
    langCode: 'en',
    tenant: 'lanmaster'
  },
  {
    id: 5,
    page: 'home',
    type: 'default',
    title: 'Default',
    message: 'Default message',
    langCode: 'en',
    tenant: 'lanmaster'
  },
  {
    id: 6,
    page: 'repair',
    type: 'info',
    title: 'Information',
    message: 'info message',
    langCode: 'sv',
    tenant: 'lanmaster'
  },
  {
    id: 7,
    page: 'repair',
    type: 'info',
    title: 'Information',
    message: 'info message',
    langCode: 'en',
    tenant: 'lanmaster'
  }
];

class AlertsApi {

  static loadAlertsMock() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], alerts));
      }, delay);
    });
  }

  static loadAlerts() {
    //TODO: integrate with real API
  }

  static loadAlertsForPageMock(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([],
          alerts.filter(alert => {
            if (alert.page === params.page && alert.langCode === params.lancode) {
              alert.isVisible = true;
              return alert;
            }
          }
        )));
      }, delay);
    });
  }

  static loadAlertsForPage(params) {

    return axios({
      method: 'get',
      url: `${config.alert.baseUrl}${config.alert.version}${config.alert.mapping}`,
      timeout: config.alert.timeout,
      params: {...params}
    }).then(response => {
      const alerts = response.data;

      if (alerts &&  Array.isArray(alerts)) {
        return alerts.map(alert => {
          alert.isVisible = true;
          return alert;
        });
      }
      else {
        return [];
      }
    }).catch(error => {
      throw(error);
    });
  }

}

export default AlertsApi;
