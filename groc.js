const { Router } = require('express');
const router = Router();

router.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

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
    res.send(groceries)
});


router.post('/', (req, res) => {
    groceries.push(req.body);
    res.send(groceries)
});


module.exports = router; 