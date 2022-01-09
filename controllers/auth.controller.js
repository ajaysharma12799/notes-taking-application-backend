const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await UserModel.findOne({email});
        if(!user) { // If User is Not Present
            return res.status(400).json({error: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

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

const AuthController = {
    loginUser
};

module.exports = AuthController;