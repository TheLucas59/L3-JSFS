import http from 'http';
import RequestController from './src/RequestController.js';

const server = http.createServer(
    (request,response) => {
        new RequestController(request, response).handle();
        response.end();
    }
)

server.listen(8080);