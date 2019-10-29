const passport = require('passport');
const {User, validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const router = express.Router();




router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.json({ "error": error.details[0].message});
    //res.status(400).send();
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    user = new User(_.pick(req.body, ['name', 'email', 'password','roles','detail']));
    await user.save();
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    res.send(token);
});


module.exports = router; 
