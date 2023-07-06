const User = require("./schema/userSchema");

class UserModel {

    static async findByEmail({ email }) {
        const user = await User.findOne({ email });
        return user;
      }

    static async findAll() {
        const users = await User.find({});
        return users;
    }

    static async create({ newUser }) {
        const createdNewUser = await User.create(newUser);
        return createdNewUser;
    }

}

module.exports = UserModel;