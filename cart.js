const { Router } = require('express');
const router = Router();

router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

router.get('/', (req, res) => {
    const { cart } = req.session;
    if (!req.session.cart) {
        res.send('You have nothing in your cart');
    } else {
        res.send(req.session.cart);
    }
});

router.post('/', (req, res) => {
    const { item, amount } = req.body;
    const cartList = { item, amount };
    const { cart } = req.session;
    if (req.session.cart) {
        req.session.cart.items.push(cartList);
    } else {
        req.session.cart = {
            items: [cartList]
        }
    }
    console.log(cart);
    res.sendStatus(201);
});

module.exports = router;