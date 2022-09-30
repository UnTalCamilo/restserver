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
    console.log(req.body);
    email = req.body.email;
    const _id = User.findById(email);
    
    if (!_id) {
        return res.status(400).json({
            msg: 'User does not exist'
        });
    }
    console.log(_id);
    const user = User.findByIdAndUpdate(_id, req.body, { new: true });

    res.status(200).json({
        msg: 'put - api',
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