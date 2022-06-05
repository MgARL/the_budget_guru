const express = require('express')
const cors = require('cors')
require('dotenv').config()
const portNumber = process.env.PORT

const app = express()

// MiddleWare
const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// controllers

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

app.listen(portNumber, () => console.log(`listening on port ${portNumber}`))