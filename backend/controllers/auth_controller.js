const auth = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User } = db

// sign_up
auth.post('/signup',async (req, res) => {
    let { password, ...rest } = req.body
    try {
        const user = await User.create({
            ...rest,
            password_digest: await bcrypt.hash(password, 12)
        })
        if(user){
            res.status(200).json({
                message: 'Account Created'
            })
        }
        res.status(500).json({
            message: 'Something went wrong please try again'
        })
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong please try again'
        })
    }
} )

module.exports = auth