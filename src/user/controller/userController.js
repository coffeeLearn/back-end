const express = require("express");
const userService = require("../service/userService");
const userRouter = express();

userRouter.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

userRouter.post("/signup", async (req, res, next) => {
    try {
        const { email, password, name, phone, addr } = req.body;
        const newUser = await userService.signup({
            email, password, name, phone, addr
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


        // 프론트 단에 저장?
        res.cookie("token", loginUser.token).status(200).send(loginUser);
    } catch (err) {
        next(err);
    }
});

userRouter.get("/logout", async(req, res, next) => {

    res.cookie("token", null, { maxAge: 0});
    res.render("");
});


module.exports = userRouter;