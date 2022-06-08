const db = require('../models')
const jwt = require('jsonwebtoken')

const { User } = db

async function defineCurrentUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const result = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(result)
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
            error,
            message: 'Something went wrong please try again or login AA'
        })
    }
}
module.exports = defineCurrentUser