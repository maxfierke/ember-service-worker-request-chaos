/* eslint-env node */
'use strict';

const Config = require('./lib/config');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-service-worker-request-chaos',

  included: function(app) {
    this._super.included && this._super.included.apply(this, arguments);
    this.app = app;
    this.app.options = this.app.options || {};
    this.app.options['esw-request-chaos'] = this.app.options['esw-request-chaos'] || {};
  },

  treeForServiceWorker(swTree, appTree) {
    var options = this.app.options['esw-request-chaos'];
    var configFile = new Config([appTree], options);

    return mergeTrees([swTree, configFile]);
  }
};
