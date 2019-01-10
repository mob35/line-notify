'use strict';
var mongoose = require('mongoose'),
    _model = require('../models/model').model,
    Model = mongoose.model(_model),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash'),
    request = require('request');

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




exports.postPlayList = function (req, res) {
    var mongooseModel = new Model(req.body);
    // mongooseModel.createby = req.user;
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

exports.getPlayListById = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};


exports.putPlayList = function (req, res) {
    var mongooseModel = _.extend(req.data, req.body);
    mongooseModel.updated = new Date();
    mongooseModel.updated = Date.now();
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

exports.slicePlayer = function (req, res, next) {
    let player = req.body.player;
    if (player && player.length < 35) {
        req.body.playerid = player.slice(17, 28);
        req.data = req.body ? req.body : {};
        next();
    } else {
        req.body.playerid = player.slice(32, 43);
        req.data = req.body ? req.body : {};
        next();
    }
};

exports.apiPlayer = function (req, res, next) {
    let apiKey = 'AIzaSyBh2fcKML6BykkO4lo0lrQPBd3q0DSEQhw';
    request(
        'https://www.googleapis.com/youtube/v3/videos?id=' +
        req.data.playerid +
        '&key=' +
        apiKey +
        '&part=snippet,statistics&fields=items(id,snippet,statistics)',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let googleapis = JSON.parse(body);
                req.data = {
                    playerid: googleapis.items[0].id,
                    player: req.body.player,
                    title: googleapis.items[0].snippet.title,
                    thumbnail: googleapis.items[0].snippet.thumbnails.medium.url,
                    channeltitle: googleapis.items[0].snippet.channelTitle
                }
                next();
            } else {
                return res.status(400).send({
                    status: 400,
                    message: errorHandler.getErrorMessage(err)
                });
            }
        });
};

exports.postPlayer = function (req, res) {
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
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.getPlayList = function (req, res) {
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

exports.getPlayerByUser = function (req, res) {
    Model.find({ 'createby._id': req.user }, function (err, datas) {
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

exports.getByUserID = function (req, res, next, id) {
    let userId = id;
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
            req.user = userId ? userId : '';
            next();
        };
    });
};