const expense = require('express').Router()
const db = require('../models')

const { Expenses } = db

// routes
expense.get('/get', async (req, res) => {
    const { expenses_category_id } = req.query
    try {
        const expenses = await Expenses.findAll({
            where: {
                expenses_category_id,
            }
        })
        res.status(200).json({
            expenses
        })
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

expense.post('/create', async (req, res) => {
    try {
        const newExpense = await Expenses.create({
            ...req.body
        })
        if (newExpense){
            res.status(201).json({
                message: 'expenses Added'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

expense.put('/update', async (req, res) => {
    const { expense_id, ...rest } = req.body
    try {
        await Expenses.update( rest,{
            where:{
                expense_id
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

expense.delete('/delete', async (req, res) => {
    const { expense_id } = req.body
    try {
        await Expenses.destroy({
            where: {
                expense_id
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

module.exports = expense