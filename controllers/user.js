const { request, response } = require('express')
const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')
const config = require('../db/config')
const mongoose = config.mongoose

// const userGet = (req, res) => {
//     const query = req.query
//     console.log(query);
    
//     res.json({
//         msg:    'get - api'
//     });
// };

const userGet = async (req, res) => {
    const users = await Usuario.find()
    res.json({
        users
    });
};

const userPost = (req, res) => {
    res.json({
        msg:    'post - api'
    })
};
const userPut = (req, res) => {
    res.json({
        msg:    'put - api'
    })
};
const userDelete = (req, res) => {
    res.json({
        msg:    'delete - api'
    })
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}