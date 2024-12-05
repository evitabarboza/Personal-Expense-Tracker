const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// In-memory storage for expenses
let expenses = [];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Expense Tracker API!');
});

// Endpoint: Add a new expense
app.post('/expenses', (req, res) => {
    const { category, amount, date } = req.body;

    if (!category || !amount || !date) {
        return res.status(400).json({ status: 'error', error: 'All fields (category, amount, date) are required.' });
    }

    if (amount <= 0) {
        return res.status(400).json({ status: 'error', error: 'Amount must be a positive number.' });
    }

    const expense = { id: expenses.length + 1, category, amount, date };
    expenses.push(expense);
    res.json({ status: 'success', data: expense });
});

// Endpoint: Retrieve expenses with optional filters
app.get('/expenses', (req, res) => {
    const { category, startDate, endDate } = req.query;

    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = filteredExpenses.filter(expense => expense.category === category);
    }

    if (startDate || endDate) {
        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (!startDate || expenseDate >= new Date(startDate)) &&
                   (!endDate || expenseDate <= new Date(endDate));
        });
    }

    res.json({ status: 'success', data: filteredExpenses });
});

// Endpoint: Analyze spending
app.get('/expenses/analysis', (req, res) => {
    const totalByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const highestSpendingCategory = Object.keys(totalByCategory).reduce((highest, category) => {
        return totalByCategory[category] > (totalByCategory[highest] || 0) ? category : highest;
    }, null);

    res.json({
        status: 'success',
        data: {
            totalByCategory,
            highestSpendingCategory,
        },
    });
});

// Cron job: Generate summary (e.g., daily summary at midnight)
cron.schedule('0 0 * * *', () => {
    console.log('Generating daily summary...');
    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`Total spending today: ${totalSpending}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
