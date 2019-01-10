'use strict';
var request = require('supertest'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    _model = require('../models/model').model,
    app = require('../../../config/express'),
    Model = mongoose.model(_model);

var credentials,
    credentials2,
    credentials3;

describe(_model + ' Authentication routes tests', function () {

    before(function (done) {
        credentials = {
            password: "password",
            email: "test@email.com",
            username:"test"
        };
        credentials2 = {
            password: "password",
            email: "test@email.com",
            username:"test"
        };
        credentials3 = {
            serial:'5b2cd04ea4b5ce00142c76f0sssssssssssssssssss',
            username:"5b2cd04ea4b5ce00142c76f0sssssssssssssssssss"
        };
        done();
    });

    it('should be ' + _model + ' signup', function (done) {

        request(app)
            .post('/api/auth/signup')
            .send(credentials)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                done();
            });

    });

    it('should be ' + _model + ' signup with serial', function (done) {

        request(app)
            .post('/api/auth/signup')
            .send(credentials3)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                done();
            });

    });

    it('should be ' + _model + ' signin', function (done) {

        request(app)
            .post('/api/auth/signin')
            .send(credentials2)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                done();
            });

    });

    it('should be ' + _model + ' signin with serial', function (done) {

        request(app)
            .post('/api/auth/signin')
            .send(credentials3)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                done();
            });

    });
    // it('should be ' + _model + ' signup duplicate username (status 400)', function (done) {
    //     credentials = {
    //         username: "username",
    //         password: "password",
    //         firstName: "firstname",
    //         lastName: "lastname",
    //         email: "test1@email.com"
    //     }
    //     request(app)
    //         .post('/api/auth/signup')
    //         .send(credentials)
    //         .expect(400)
    //         .end(function (err, res) {
    //             assert.notEqual(res.body.message.indexOf('username already exists'), -1);
    //             done();
    //         });

    // });

    it('should be ' + _model + ' signup duplicate email (status 400)', function (done) {

        credentials = {
            username: "username1",
            password: "password",
            firstName: "firstname",
            lastName: "lastname",
            email: "test@email.com"
        }

        request(app)
            .post('/api/auth/signup')
            .send(credentials)
            .expect(400)
            .end(function (err, res) {
                assert.notEqual(res.body.message.indexOf('email already exists'), -1);
                done();
            });

    });

    // it('should be ' + _model + ' signup if no firstname is provided (status 400)', function (done) {

    //     credentials = {
    //         username: "username1",
    //         password: "password",
    //         firstName: "",
    //         lastName: "lastname",
    //         email: "test@email.com"
    //     }

    //     request(app)
    //         .post('/api/auth/signup')
    //         .send(credentials)
    //         .expect(400)
    //         .end(function (err, res) {
    //             assert.notEqual(res.body.message.indexOf('Please fill in your first name'), -1);
    //             done();
    //         });

    // });

    // it('should be ' + _model + ' signup if no lastname is provided (status 400)', function (done) {

    //     credentials = {
    //         username: "username1",
    //         password: "password",
    //         firstName: "firstname",
    //         lastName: "",
    //         email: "test@email.com"
    //     }

    //     request(app)
    //         .post('/api/auth/signup')
    //         .send(credentials)
    //         .expect(400)
    //         .end(function (err, res) {
    //             assert.notEqual(res.body.message.indexOf('Please fill in your last name'), -1);
    //             done();
    //         });

    // });

    // it('should be ' + _model + ' get profile logged in use token', function (done) {
    //     credentials = {
    //         username: "username",
    //         password: "password",
    //         firstName: "firstname",
    //         lastName: "lastname",
    //         email: "test@email.com"
    //     };
    //     request(app)
    //         .post('/api/auth/signin')
    //         .send(credentials)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             request(app)
    //                 .get('/api/getuser')
    //                 .set('Authorization', 'Bearer ' + res.body.token)
    //                 .expect(200)
    //                 .end(function (err, res) {
    //                     if (err) {
    //                         return done(err);
    //                     }
    //                     var resp = res.body;
    //                     assert.equal(resp.status, 200);
    //                     assert.equal(resp.data.username, credentials.username);
    //                     assert.equal(resp.data.firstName, credentials.firstName);
    //                     assert.equal(resp.data.lastName, credentials.lastName);
    //                     assert.equal(resp.data.email, credentials.email);
    //                     assert.equal(resp.data.displayName, credentials.firstName + ' ' + credentials.lastName);
    //                     done();
    //                 });
    //         });

    // });

    after(function (done) {
        Model.remove().exec(done);
    });

});