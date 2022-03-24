'use strict';

const axios = require("axios");
const {env} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      const previousValue = await strapi.query("fce-user").findOne({ id: params.id })
      if (previousValue.published_at === null && data.published_at !== null) {
        const serverUrl = env("FCE_SERVER_URL");
        const token = env("FCE_TOKEN");
        const endpointUrl = `${serverUrl}/api/userActivated`;

        axios.post(endpointUrl, {
          email: previousValue.email
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
  }
};
