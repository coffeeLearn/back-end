const express = require("express");
const orderRouter = express();

orderRouter.get('/order', async (req, res, next) => {
    res.send('여긴 오더');
})