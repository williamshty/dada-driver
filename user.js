const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const sms = require('./sms');
import User from '../models/user.js';
import FD from '../models/fd.js';
import Driver from '../models/driver.js';
import Ride from '../models/ride.js';

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

mongoose.connect('mongodb://localhost/dada');

// WARNING: only call this function after verify the phone number
//registration when the user passed verification
/**
* @param: user.phoneNum
* @return: data.user(user schema), data.socket(socket schema)
*/
router.post('/user', function(req, res) {
  var newUser = new User(req.body.user);
  newUser.save(function(err, u) {
    if (err) {
      res.status(400).json({
        code: 1301,
        message: err
      });
    } else { //
      console.log(u._id);
      var newfd = new FD();
      newfd.userid = u._id;
      newfd.save(function(err2, fd) {
        if (err2) {
          res.status(400).json({
            code: 1301,
            message: err2
          });
        } else {
          res.status(200).json({
            code: 1001,
            message: 'OK',
            data: {
              user: u,
              socket: fd
            }
          });
        }
      });
    }
  });
});

//login with verification code
/**
* @param: phoneNum
* @return: data.code, data.time
*/
router.post('/login', function(req, res) {
  //is registered?
  User.findOne({
    "phoneNum": req.body.phoneNum
  }).exec(function(err, result) {
    if (err) throw err;
    if (!result) {
      res.status(200).json({
        code: 1002,
        message: "no such user"
      });
    }else{ //registered, login with verification code
      sms.sendSMS(req.body.phoneNum, 'login', function(err2, result2){
        if(err2) throw err2;
        res.status(200).send(result2);
      });
    }
  });
});

//get verification code when registering
/**
* @param: phoneNum
* @return: data.code, data.time
*/
router.get('/register', function(req, res) {
  //is registered?
  User.findOne({
    "phoneNum": req.query.phoneNum
  }).exec(function(err, result) {
    if (err) throw err;
    if(result){ //registered
      res.status(200).json({
        code: 1003,
        message: "already exist!"
      });
    }else{ // not registered
      sms.sendSMS(req.body.phoneNum, 'register', function(err2, result2){
        if(err2) throw err2;
        res.status(200).send(result2);
      });
    }
  });
});

//search user by ID or phoneNum or search for all user(why?)
/**
* @param: method; _id or phoneNum
* @return: user schema
*/
router.get('/user', function(req, res) {
  if (req.query.method == 'all'){
    User.find().exec(function(err, result) {
      if (err) throw err;
      res.status(200).json({
        code: 1001,
        message: "OK",
        data: result
      });
    });
  }else{
    var cond = (req.query.method == 'id') ? {"_id": req.query._id} : {"phoneNum": req.query.phoneNum};
    if(!mongoose.Types.ObjectId.isValid(req.query._id)){
      res.status(200).json({
        code: 1002,
        message: "no such user"
      });
    }else{
      User.findOne(cond).exec(function(err, result) {
        if (err) throw err;
        if(result){
          res.status(200).json({
            code: 1001,
            message: "OK",
            data: result
          });
        }else{
          console.log('no user')
          res.status(200).json({
            code: 1002,
            message: "no such user"
          });
        }
      });
    }
  }
});

// WARNING: update personal information (not in use now)
/**
* @param: _id, phoneNum(the new one)
* @return: user schema
*/
router.put('/user', function(req, res) {
  //find the user
  if(!mongoose.Types.ObjectId.isValid(req.body._id)){
    res.status(200).json({
      code: 1002,
      message: "no such user"
    });
  }else{
    User.findOne({
      "phoneNum": req.body.phoneNum
    }).exec(function(err, result) {
      if (err) throw err;
      if (result && result._id != req.body._id) { //already exists
        res.status(200).json({
          code: 1003,
          message: "already exists"
        });
      }else{ //legal change
        User.updateOne({
          _id: req.body._id
        }, {
          $set: { phoneNum : req.body.phoneNum}
        }).exec(function(err2, result2) {
          if (err2) throw err2;
          res.status(200).json({
            code: 1001,
            message: "OK",
            data: {_id: req.body._id, phoneNum : req.body.phoneNum}
          });
        });
      }
    });
  }
});

//delete user by ID
/**
* @param: _id
* @return: user schema(deleted)
*/
router.delete('/user', function(req, res) {
  if(!mongoose.Types.ObjectId.isValid(req.body._id)){

    res.status(200).json({
      code: 1002,
      message: "no such user"
    });
  }else{
    User.find().exec(function(err, result) {
      if (err) throw err;
      User.remove({ _id: req.body.id }, function(err2) {
        if (err2) {
          res.status(400).json({
            code: 1301,
            message: err2
          });
        }
        else {
          res.status(200).json({
            code: 1001,
            message: "OK",
            data: result
          });
        }
      });
    });
  }
});

module.exports = router;
