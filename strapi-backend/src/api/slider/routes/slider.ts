'use strict';

const { createCoreRoute } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/sliders',
      handler: 'slider.find',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/sliders/:id',
      handler: 'slider.findOne',
      config: {
        auth: false
      }
    }
  ]
};