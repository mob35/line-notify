'use strict';
var _model = require('../models/model').model,
    controller = require('../controllers/controller'),
    core = require('../../core/controllers/core.server.controller'),
    policy = require('../policy/policy');
module.exports = function (app) {
    var url = '/api/' + _model;
    var urlWithParam = '/api/' + _model + '/:' + _model + 'id';
    app.route(url).all(core.jwtCheck, policy.isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route(urlWithParam).all(core.jwtCheck, policy.isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.route('/api/gat-notify').all(core.jwtCheck, policy.isAllowed)
        .get(controller.apiNotify);
        // .post(controller.slicePlayer, controller.apiPlayer, controller.postPlayer);

    

    app.param(_model + 'id', controller.getByID);
}