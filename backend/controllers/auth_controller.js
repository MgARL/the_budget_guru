const auth = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

// 

module.exports = auth