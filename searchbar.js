const { Router } = require('express');
const router = Router();

let groceries = [
    {
        item: 'banana',
        amount: 10
    },
    {
        item: 'potato',
        amount: 6
    },
    {
        item: 'tomato',
        amount: 15
    },
    {
        item: 'yogurt',
        amount: 24
    }
]

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/search', (req, res) => {
    const { item } = req.query;
    const findItem = groceries.find((g) => g.item.toLowerCase() === item.toLowerCase());
    findItem ? res.send(findItem) : res.send('Nothing found');
});

module.exports = router;