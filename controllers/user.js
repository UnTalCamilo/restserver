const { request, response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')


const { validate } = require('../models/user')
const { validationResult } = require('express-validator')



// const userGet = async (req, res) => {
//     const users = await User.find()
//     res.json({
//         users
//     });
// };
// userGet() with transactions
const userGet = async (req, res) => {
    const session = await User.startSession();
    try {
        session.startTransaction();
        const users = await User.find()
        res.status(200).json({
            users
        });
        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({
            error: error
        })
    }
};


const userPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }

    const { name, email, pwd, role } = req.body

    const user = new User({ name, email, pwd, role })

    const emailExists = await User.findOne({ email })

    if (emailExists) {
        return res.status(400).json({
            msg: 'Email already exists'
        });
    }

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    const pwdEncrypted = bcryptjs.hashSync(pwd, salt);
    user.pwd = pwdEncrypted

    // Save user
    const respPost = await user.save();
    return res.status(200).json({
        msg: 'post - api',
        user: respPost
    });
};

const userPut = (req, res) => {


    const { name, pwd, google, email, ...rest } = req.body;
    
    if (pwd) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.pwd = bcryptjs.hashSync(pwd, salt);
    }

    const user = users.findByIdAndUpdate(id, rest);
    res.json({
        user
    });

};
const userDelete = (req, res) => {
    res.json({
        msg: 'delete - api'
    })
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}