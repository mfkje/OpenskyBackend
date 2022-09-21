const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const { getJWT } = require('../tokens/get-jwt');

const authentication = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User or password incorrect",
            })
        }

        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(403).json({
                message: "Email or Password Incorrect!"
            });
        }
        //console.log("secret key " + process.env.SECRET_KEY);
        const token = await getJWT(user.id);
        res.json({     
          token,
          user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
}


module.exports = { authentication }