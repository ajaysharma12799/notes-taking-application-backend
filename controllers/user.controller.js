const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        let user = await UserModel.findOne({email});
        if(user) {
            return res.status(400).json({error: "User Already Exists"});
        }
        user = new UserModel({username, email, password}); // Create New User

        const salt = await bcrypt.genSalt(10); // Generate Salt
        user.password = await bcrypt.hash(password, salt); // Hash User Password
        await user.save(); // Saving User Password

        const payload = { // Payload Object
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        };

        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) {
                console.log(error.message);
                throw error;
            }
            return res.status(200).json(token);
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

const UserController = {
    registerUser
};

module.exports = UserController;