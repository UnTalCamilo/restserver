require('dotenv').config(); //Node
const Server = require('./models/server');// Terceros

const server = new Server();// Propios

server.listen();