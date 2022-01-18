export default class IOController {
    #server
    #clients
    #timers

    constructor(server) {
        this.#server = server;
        this.#clients = new Map();
        this.#timers = new Map();
    }

    handleSocket(socket) {
        console.log(`New client connected with id ${socket.id}`);
        this.#clients.set(socket.id, socket);
        const idInterval = setInterval(this.randomNumber.bind(this, socket), 2000);
        this.#timers.set(socket.id, idInterval);
        socket.on('disconnect', () => {
            clearInterval(this.#timers.get(socket.id));
            this.#timers.delete(socket.id);
            this.#clients.delete(socket.id);
        });
    }

    randomNumber(socket) {
        //même nombre pour chaque client
        /*const random = Math.floor(Math.random() * 10);
        this.#server.emit('newNumber', random);*/

        //nombre différent pour chaque client
        const random = Math.floor(Math.random() * 10);
        this.#server.to(socket.id).emit('newNumber', random);
        console.log(`Number ${random} sent to user ${socket.id}`);
    }

}