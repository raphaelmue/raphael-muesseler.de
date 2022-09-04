'use strict';

/**
 * master-data service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::master-data.master-data');
