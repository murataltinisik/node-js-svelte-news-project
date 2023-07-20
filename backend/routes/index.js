const express = require('express');
const router = express.Router();

// JSON WEB TOKEN
const jwt = require('jsonwebtoken');

// BCRYPT
const bcrypt = require('bcrypt');

// MODEL
const UserModel = require('../models/Users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// SIGN UP
router.post("/signup", (req, res) => {
  // TAKE DATA
  const { name, surname, email, password, confirm } = req.body;

  // CONTROLS
  if(!name || name.length === 0){
    res.json({ message: "Name field is require!!", code: -1 });
  }else if(!surname || surname.length === 0){
    res.json({ message: "Surname field is require!!", code: -1 });
  }else if(!email || email.length === 0){
    res.json({ message: "Email field is require!!", code: -1 });
  }else if(!password || password.length === 0){
    res.json({ message: "Password field is require!!", code: -1 });
  }else if(password !== confirm){
    res.json({ message: "Passwords do not match.", code: -1 });
  }else{
    // ACCORDING THE EMAIL, EXISTS USER?
    const existsUser = UserModel.findOne({ email });

    existsUser.then(data => {
      if(data){
        res.json({ message: "Please, Change your email!!!", code: -1 });
      }else{
        // SAVE USER
        bcrypt.hash(password, 10).then(hash => {
          const model = new UserModel({ name, surname, email, password: hash });
          const promise = model.save();

          promise.then((data) => {
            if(data){
              const payload = { email };
              const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                expiresIn: 3600
              });

              res.json({ message: "Register Successfully!!!", token, user_id: data._id, code: 200 });
            }else{
              res.json({ message: "Register Unsuccessfully!", code: 200 });
            }
          }).catch(err => {
            res.json(err);
          });
        });
      }
    }).catch(err => {
        res.json(err);
    });
  }
});

// SIGN IN
router.post('/signin', (req, res) => {
  // TAKE DATA
  const { email, password } = req.body;

  // CONTROL
  if(!email || email.length === 0){
    res.json({ message: "Email field is require!", code: -1 });
  }else if(!password || password.length === 0){
    res.json({ message: "Password field is require!", code: -1 });
  }else{
    // EXISTS USER
    const promise = UserModel.findOne({ email }, '_id email password');

    promise.then((data) => {
      if(!data){
        res.json({ message: "User not found!!!", code: -1 });
      }else{
        bcrypt.compare(password, data.password).then(result => {
          if(result){
            // UPDATE LAST LOGIN
            const updateLastLogin = UserModel.findByIdAndUpdate(data._id, { last_login: Date.now() }, { new: true });

            updateLastLogin.then(user => {
                const payload = { email };
                const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                    expiresIn: 3600
                });

                res.json({ message: "Login Successfully.", token, user_id: data._id, code: 200 });
            }).catch(err => {
                res.json(err);
            });
          }else{
            res.json({ message: "Please, Again you try to enter the password..", code: -1 });
          }
        }).catch(err => {
          res.json(err);
        });
      }
    }).catch(err => {
        res.json(err);
    });
  }
});

module.exports = router;
