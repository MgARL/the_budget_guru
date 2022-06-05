const db = require('../models')
const jwt = require('json-web-token')

const { User } = db

async function defineCurrentUser(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(token){
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            const { id } = result.value
            let user = await User.findOne({
                where:{
                    user_id: id
                }
            })
            req.currentUser = user
            next()
        }
        res.status(403).json({
            message: 'invalid authorization'
        })
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong please try again or login'
        })
    }
}