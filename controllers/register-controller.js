const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const registerController = async(req, res) => {
    const {email, password, name, surname} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const newUser = new User({ email, password, name, surname });

            const salt = bcryptjs.genSaltSync();
            newUser.password = bcryptjs.hashSync(password, salt);
            //console.log("password - " + password);
            await newUser.save();
            return res.status(201).json({
                message: "User Created",
                newUser
            })
        } else {
            return res.status(400).json({
                message: "User exists"
            })
        }
    } catch {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
       
    }
}

module.exports = { registerController }