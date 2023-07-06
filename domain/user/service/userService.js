const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { v4 } = require('uuid');
const dayjs = require("dayjs");
const { use } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");

class userService {

    static async signup({ email, password, name, phone, addr }) {
        const user = await User.findByEmail({ email });

        if(user) {
            return "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요";
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const uuid = () => {
            const tokens = v4().split('-')
            return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
        }

        // uuid로 안만들어도 mongodb가 만드는 _id가 있네? 버릴까?
        const userId = uuid();
        const days = dayjs().format('YYYY-MM-DD HH:mm:ss');

        const newUser = {userId, password: hashedPassword, name, phone, email, addr, reg_date: days};

        const createNewUser = await User.create({ newUser });

        return createNewUser;
    }

    static async signin({ email, password }) {
        const user = await User.findByEmail({ email });
        
        if(!user) {
            return "일치하는 이메일이 없습니다. 다시 확인해 주세요.";
        }

        const userPassword = user.password;
        const passwordMatch = await bcrypt.compare(password, userPassword);
        console.log(passwordMatch);
        if(!passwordMatch) {
            return "비밀번호가 일치하지 않습니다. 다시 확인해 주세요.";
        }

        // 로그인 후에 필요한 내용들은? id만 있어도 되지않을까? 나머지는 검색으로 끌어오고?
        const id = user.id;
        const authority = user.authority;

        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id, authority }, secretKey);

        const loginUser = { token, id, authority };

        return loginUser;
    }

}

module.exports = userService;