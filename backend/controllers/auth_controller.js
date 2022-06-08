const auth = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = db

// sign_up
auth.post('/signup', async (req, res) => {
    let { password, ...rest } = req.body
    try {
        const user = await User.create({
            ...rest,
            password_digest: await bcrypt.hash(password, 12)
        })
        if (user) {
            res.status(200).json({
                message: 'Account Created'
            })
            return
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
})

// login
auth.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user || !await bcrypt.compare(req.body.password, user.password_digest)) {
            res.status(403).json({
                message: 'Wrong credentials provided, please try again'
            })
        } else {
            const token = jwt.sign({
                id: user.user_id
            }, process.env.JWT_SECRET)
            console.log(token)
            res.status(200).json({
                token
            })
        }
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong please try again'
        })
    }

})

module.exports = auth