const express = require('express');
const cors=require('cors');
const { dbConnection } = require('../db/config');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.conectarBD();
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("listening port:",this.port);
        });
    }

    async conectarBD(){
        await dbConnection()
    }


}

module.exports = Server;