const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body || {};
    const user = await User.findOne({
      phone: phone,
    });
    if (user) {
      throw new Error(" User Already Registered with same phone number");
    }
    if (role === "doctor" && req.user.role !== "admin") {
      throw new Error("only admin can create user with role of doctor");
    }
    let newUser = await User.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      role: role,
    });
    if (!newUser) {
      throw new Error("error in creating user");
    }
    return res.status(201).json({
      msg: "User Registered Successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(501).json({
      msg: `registraton error: ${err}`,
    });
  }
};

module.exports.logIn = async (req, res) => {
    try {
        const {
            phone,
            password,
        } = req.body || {};

        const user = await User.findOne({
            phone: phone
        });
        if (!user) {
            return res.status(402).send({
                msg: "user not registered"
            });
        }
        if (user.password != password) {
            return res.status(402).send({
                msg: "incorrect userid/password"
            });
        }

        const token = jwt.sign({
            phone: user.phone,
            name: user.name
        }, "secretKey",{
            expiresIn:"1d"
        });

        return res.status(201).send({
            msg: "token generated successfully",
            data: {
                token: token
            }
        });
    } catch (err) {
        console.log("error in creating  User");
        return res.status(500).send(err);
    }
};
