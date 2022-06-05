const budget = require('express').Router()
const { DATE } = require('sequelize')
const db = require('../models')

const { Budget } = db

// get budgets
budget.get('/get', async (req, res) => {
    try {
        const budgets = await Budget.findAll({
            where: {
                user_id: req.currentUser.user_id
            }
        })

        res.status(200).json(
            budgets
        )
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Something went wrong please try again'
        })
    }
})

// create budget
budget.post('/create', async (req, res) =>{
    try {
        let budget = await Budget.create({
            ...req.body,
            user_id: req.currentUser.user_id,
        })
        if (budget){
            res.status(200).json({
                message: 'budget created'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

//delete budget

budget.delete('/delete', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = budget