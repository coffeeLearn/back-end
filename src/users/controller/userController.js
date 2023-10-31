const express = require("express");
const userService = require("../service/userService");
const userRouter = express();
const jwt = require("jsonwebtoken");
const login_required = require("../../middlewares/login-required");
const adminOnly = require("../../middlewares/admin-only");
require('dotenv').config();

userRouter.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

userRouter.post("/signup", async (req, res, next) => {
    try {
        const { email, password, name, phone, address, detailedAddress } = req.body;
        const newUser = await userService.signup({
            email, password, name, phone, address, detailedAddress
         });

         res.status(200).json(newUser);
    } catch(err) {
        next(err);
    }
});

userRouter.post("/login", async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const loginUser = await userService.signin({ email, password });

        res.status(200).send(loginUser);
    } catch (err) {
        next(err);
    }
});

userRouter.get("/mypage", login_required, async(req, res, next) => {
    try {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const secretKey = process.env.JWT_SECRET_KEY;
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.id;

        const user = await userService.getUser({ id: user_id });

        res.status(200).send(user);
    } catch(err) {
        next(err);
    }
});

userRouter.put("/mypage", login_required, async(req, res, next) => {
    try {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const secretKey = process.env.JWT_SECRET_KEY;
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.id;

        const password = req.body.password;
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const address = req.body.address;
        const detailedAddress = req.body.detailedAddress;

        const newUserValue = { password, name, phone, email, address, detailedAddress };

        const user = await userService.putUser({ id: user_id, newUserValue });

        res.status(200).send(user);
    } catch(err) {
        next(err);
    }
});

userRouter.delete("/mypage", login_required, async (req, res, next) => {
    try {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const secretKey = process.env.JWT_SECRET_KEY;
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.id;

        const withdrawal = await userService.withdrawal({ id: user_id });

        res.status(200).send(" 회원 탈퇴 완료 ");
    } catch(err) {
        next(err);
    }
});

userRouter.get("/admin", adminOnly, async (req, res, next) => {
    try {
        const userList = await userService.getUserList();

        res.status(200).send(userList);
    } catch(err) {
        next(err);
    }
});


module.exports = userRouter;