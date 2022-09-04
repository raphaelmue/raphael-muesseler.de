'use strict';

/**
 * master-data router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::master-data.master-data');
