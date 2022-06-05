const express = require('express')
const cors = require('cors')
require('dotenv').config()
const portNumber = process.env.PORT

const app = express()
const authController = require('./controllers/auth_controller')
const budgetController = require('./controllers/budget_controller')
const defineCurrentUser  = require('./middleware/defineCurrentUser')

// MiddleWare
const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// controllers
app.use('/auth', authController)

app.use('/budget', defineCurrentUser, budgetController)

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

app.listen(portNumber, () => console.log(`listening on port ${portNumber}`))