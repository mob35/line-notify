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

    app.route('/api/playlists')
        .get(controller.getPlayList)
        .post(controller.postPlayList);

    app.route('/api/playlists/:playerId')
        .get(controller.getPlayListById)
        .put(controller.putPlayList)
        .delete(controller.delete);

    app.route('/api/player').all(core.jwtCheck, policy.isAllowed)
        .get(controller.getPlayList)
        .post(controller.slicePlayer, controller.apiPlayer, controller.postPlayer);

    app.route('/api/player/:playerId').all(core.jwtCheck, policy.isAllowed)
        .get(controller.getPlayListById)
        .put(controller.putPlayList)
        .delete(controller.delete);

    app.route('/api/playerbyuser/:userId').all(core.jwtCheck, policy.isAllowed)
        .get(controller.getPlayerByUser);

    app.param(_model + 'id', controller.getByID);
    app.param('playerId', controller.getByID);
    app.param('userId', controller.getByUserID);
}