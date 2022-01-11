import http from 'http';
import RequestController from './controllers/requestController.js';
import {Server as ServerIO} from "socket.io"
import IOController from './controllers/IOController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);
const socketController = new IOController(io);
io.on('connection', socket => socketController.handleSocket(socket));

server.listen(8080);
