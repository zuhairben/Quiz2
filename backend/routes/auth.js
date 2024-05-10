const bcrypt = require("bcrypt");
const User = require("../model/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

// Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { email, password,admin, ...userData } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.json({ msg: "USER ALREADY EXISTS" });
    

        const hashedPassword = await bcrypt.hash(password, 5);
        await User.create({
            email,
            password: hashedPassword,
            admin,
            ...userData
        });


        res.status(200).json({ msg: "User Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user ) return res.status(404).json({ msg: "USER NOT FOUND" })

        
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG EMAIL OR PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            userId:user._id,
            admin: user.admin,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.status(200).json({
            msg: "LOGGED IN", token , data:{fullName:user.fullName,
                email:user.email,description:user.description

            }
        })
    } catch (error) {
        console.error(error)
    }
});


module.exports = router