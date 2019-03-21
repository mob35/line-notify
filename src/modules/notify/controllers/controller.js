'use strict';
var mongoose = require('mongoose'),
    _model = require('../models/model').model,
    Model = mongoose.model(_model),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash'),
    request = require('request');

exports.getToken = function (req, res) {
    request({
        method: 'POST',
        uri: 'https://notify-bot.line.me/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        form: {
            grant_type: 'authorization_code',
            code: 'ApVA5yyIZPdaaRf5qNBMlf',
            redirect_uri: 'https://line-notifies.herokuapp.com',
            client_id: 'UxOzoFBdQrzhSghQdQTelG',
            client_secret: 'snij94Bv2deyxqGrv4sf91ZNgvbAv2woRdzFAFh9qUs'
        }
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                body: body
            });
        }
    });
};

exports.webhook = function (req, res) {
    reply(reply_token)
    req.data = {
        reply_token: req.body.events[0].replyToken,
        msg: req.body.events[0].message.text
    };
    next();
};

exports.reply = function (req, res) {
    res.jsonp({
        status: 200,
        // data: req.data;
    });
};

exports.getNoti = function (req, res) {
    let token = 'AxsujbaGYVsyzUarDtuA1fVKOu1ppQ8QsY9YJOCZbDo';
    let message = 'test message ';
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
        if (err) {
            console.log(err);
        } else {
            res.json({
                httpResponse: httpResponse.statusCode,
            });
        }
    });
};

exports.postNotify = function (req, res, next) {

    let token = req.body.token;
    let message = req.body.message;
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
        if (err) {
            console.log(err);
        } else {
            // res.json({
            //     httpResponse: httpResponse,
            //     body: body
            // });
            req.data = {
                message: req.body.message
            };
            next();
        }
    });
    // req.data = req.body;
    // next();
};
exports.createNotify = function (req, res) {
    req.body = req.data;
    var mongooseModel = new Model(req.body);
    mongooseModel.createby = req.user;
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // res.jsonp({
            //     status: 200,
            //     data: data
            // });
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.getList = function (req, res) {
    Model.find(function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    }).lean();
};

exports.create = function (req, res) {
    var mongooseModel = new Model(req.body);
    mongooseModel.createby = req.user;
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Model.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var mongooseModel = _.extend(req.data, req.body);
    mongooseModel.updated = new Date();
    mongooseModel.updateby = req.user;
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};