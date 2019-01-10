'use strict';
var request = require('supertest'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    _model = require('../models/model').model,
    app = require('../../../config/express'),
    Model = mongoose.model(_model),
    User = mongoose.model('User');

var item,
    credentials,
    token;

describe(_model + ' CRUD routes tests', function () {

    before(function (done) {
        item = {
            name: 'name'
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstName: 'first name',
            lastName: 'last name',
            email: 'test@email.com'
        };
        done();
    });

    it('should be signup get token for test ', function (done) {

        this.timeout(5000); // timeout bcrypt gennarate password 2~5s
        request(app)
            .post('/api/auth/signup')
            .send(credentials)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                token = resp.token;
                assert.notEqual(resp.token, null);
                done();
            });

    });

    it('should be ' + _model + ' post use token', function (done) {
        console.log(token)
        request(app)
            .post('/api/notify')
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.name, item.name);
                done();
            });

    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Model.remove().exec(done);
        });
    });

});