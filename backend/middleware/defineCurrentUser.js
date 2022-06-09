const db = require('../models')
const jwt = require('jsonwebtoken')

const { User } = db

async function defineCurrentUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const result = jwt.verify(token, process.env.JWT_SECRET)
        const { id } = result
        let user = await User.findOne({
            where: {
                user_id: id
            }
        })
        if(user){
            req.currentUser = user.dataValues
            return next()
        }
    } catch (error) {
        res.status(500).json({
            message: 'Please Log-in again'
        })
    }
}
module.exports = defineCurrentUser