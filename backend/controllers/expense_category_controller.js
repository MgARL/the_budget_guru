const expensesCat = require('express').Router()
const db = require('../models')

const { Expense_Category} = db

// routes
expensesCat.get('/get', async (req, res) => {
    const { budget_id } = req.query
    try {
        const expensesCategories = await Expense_Category.findAll({
            where: {
                budget_id,
            }
        })
        res.status(200).json({
            expensesCategories
        })
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

expensesCat.post('/create', async (req, res) => {
    try {
        const newExpensesCat = await Expense_Category.create({
            ...req.body
        })
        if (newExpensesCat){
            res.status(201).json({
                message: 'expensesCat Added'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
            message: 'Something went wrong please try again'
        })
    }
})

expensesCat.put('/update', async (req, res) => {
    const { expenses_category_id, ...rest } = req.body
    try {
        await Expense_Category.update( rest,{
            where:{
                expenses_category_id
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

expensesCat.delete('/delete', async (req, res) => {
    const { expenses_category_id } = req.body
    try {
        await Expense_Category.destroy({
            where: {
                expenses_category_id
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

module.exports = expensesCat