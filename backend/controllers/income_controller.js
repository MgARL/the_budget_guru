const income = require('express').Router()
const db = require('../models')

const { Income } = db

// routes
income.get('/get', async (req, res) => {
    res.status(200).json({
        message: 'Hello World'
    })
})

module.exports = income