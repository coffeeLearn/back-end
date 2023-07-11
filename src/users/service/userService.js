const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { v4 } = require('uuid');
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

class userService {

    static async signup({ email, password, name, phone, addr }) {
        const user = await User.findByEmail({ email });

        if(user) {
            throw new Error("이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const days = dayjs().format('YYYY-MM-DD HH:mm:ss');

        const newUser = { password: hashedPassword, name, phone, email, addr, reg_date: days};

        const createNewUser = await User.create({ newUser });

        return createNewUser;
    }

    static async signin({ email, password }) {
        const user = await User.findByEmail({ email });
        
        if(!user) {
            throw new Error("일치하는 이메일이 없습니다. 다시 확인해 주세요.");
        }

        const userPassword = user.password;
        const passwordMatch = await bcrypt.compare(password, userPassword);
        console.log(passwordMatch);
        if(!passwordMatch) {
            throw new Error("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
        }



        const id = user.id;
        const authority = user.authority;

        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id, authority }, secretKey);

        const loginUser = { token, id, authority };

        return loginUser;
    }

}

module.exports = userService;