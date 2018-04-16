const hosts2config = require("./configs/hosts2configs.json");

let config = null;
const log = console.warning || console.error || console.log;
const globalConfig = {
  interractions: ["C", "3E", "T"]
};

function initConfig() {
  if (window && window.location && window.location.hostname) {
    if (hosts2config[window.location.hostname]) {
      return (config = {
        ...globalConfig,
        ...require(`./configs/${hosts2config[window.location.hostname]}.json`)
      });
    } else {
      log("No config file for hostname : " + window.location.hostname);
    }
  } else {
    log("Cannot get value of : window.location.hostname");
  }
  config = {};
}

initConfig();

export default {
  get: key => (config && config[key]) || null,
  reset: initConfig
};
