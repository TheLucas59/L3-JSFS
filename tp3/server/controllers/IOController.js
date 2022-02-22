export default class IOController {
    #server
    #clients

    constructor(server) {
        this.#server = server;
        this.#clients = new Map();
    }

    handleSocket(socket) {
        console.log(`New client connected with id ${socket.id}`);
        if(this.#clients.size >= 2) {
            this.#server.to(socket.id).emit('TooMuchConnections');
            console.log(`Client ${socket.id} disconnected due to a large number of players`);
            socket.disconnect(true)
        }
        else {
            this.#clients.set(socket.id, socket);  
        }
        if(this.#clients.size == 1) {
            this.#server.to(socket.id).emit('firstPlayer');
        }
        else {
            this.#server.to(socket.id).emit('secondPlayer');
        }
        console.log(this.#clients.size)
        socket.on('disconnect', () => {
            this.#clients.delete(socket.id)
            console.log(`Client ${socket.id} disconnected`)
        });
    }
}