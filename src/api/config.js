//TODO: Off-load the tenant specific components to tenant related MD module

export default {
  tenant: "lanmaster",
  defaultLanguage : "sv",
  alert: {
    baseUrl: "https://apigw.ebuilder.io/webjourney-notify/",
    version: "v1-0",
    mapping: "/alert",
    timeout: 3000
  }
};
