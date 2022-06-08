const income = require('express').Router()
const db = require('../models')

const { Income } = db

// routes
income.get('/get', async (req, res) => {
    const { budget_id } = req.query
    try {
        const incomes = await Income.findAll({
            where: {
               budget_id,
            }
        })
        res.status(200).json({
            incomes
        })
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

income.post('/create', async (req, res) => {
    try {
        const newIncome = await Income.create({
            ...req.body
        })
        if (newIncome){
            res.status(201).json({
                message: 'Income Added'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

income.put('/update', async (req, res) => {
    const { income_id, ...rest } = req.body
    try {
        await Income.update( rest,{
            where:{
                income_id
            }
        })
        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

income.delete('/delete', async (req, res) => {
    const { income_id } = req.body
    try {
        await Income.destroy({
            where: {
                income_id
            }
        })
        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

module.exports = income