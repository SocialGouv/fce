let config;
try {
  config = require("../../config/import");
} catch (error) {
  config = require("../../../config/import");
}

module.exports = config;
