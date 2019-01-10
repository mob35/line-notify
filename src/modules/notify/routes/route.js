'use strict';
var _model = require('../models/model').model,
    controller = require('../controllers/controller'),
    core = require('../../core/controllers/core.server.controller'),
    policy = require('../policy/policy');
module.exports = function (app) {
    var url = '/api/' + _model;
    var urlWithParam = '/api/' + _model + '/:' + _model + 'id';
    // app.route(url).all(core.jwtCheck, policy.isAllowed)
        // .get(controller.getList)
        // .post(controller.create);

    // app.route(urlWithParam).all(core.jwtCheck, policy.isAllowed)
    //     .get(controller.read)
    //     .put(controller.update)
    //     .delete(controller.delete);
    app.route('/api/notify').all(core.jwtCheck, policy.isAllowed)
    .post(controller.create);

    app.route('/api/notify2').get(function(req, res, next) {
        var token = 'cuHsIVD1yGgwnzEuSQ13Br9Y4T4ZE2lHVfN4T9MzNaB';
        var message = 'req.body.message';
       
        request({
          method: 'POST',
          uri: 'https://notify-api.line.me/api/notify',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth: {
            'bearer': token
          },
          form: {
            message: message
          }
        }, (err, httpResponse, body) => {
          if(err){
            console.log(err);
          } else {
            res.json({
              httpResponse: httpResponse,
              body: body
            });
          }
        });
      });

    app.param(_model + 'id', controller.getByID);
}