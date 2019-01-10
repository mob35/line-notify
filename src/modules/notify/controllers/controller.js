'use strict';
var mongoose = require('mongoose'),
    _model = require('../models/model').model,
    Model = mongoose.model(_model),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash'),
    request = require('request');

exports.getNotify = function (req, res) {
    let token = 'cuHsIVD1yGgwnzEuSQ13Br9Y4T4ZE2lHVfN4T9MzNaB';
    let message = 'req.body.message';
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
                httpResponse: httpResponse,
                body: body
            });
        }
    });
};

exports.postNotify = function (req, res, next) {
    request({
        method: 'GET',
        uri: 'https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=UxOzoFBdQrzhSghQdQTelG&redirect_uri=https://line-notifies.herokuapp.com&scope=notify&state=NO_STATE',
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(body);
            console.log(httpResponse);
            // res.json({
            //     httpResponse: httpResponse,
            //     body: body
            // });
            // req.data = {
            //    message : req.body.message
            // };
        }
    });
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
               message : req.body.message
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