'use strict';

/**
 * channel-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::channel-config.channel-config');
