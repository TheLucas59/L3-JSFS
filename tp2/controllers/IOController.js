export default class IOController {
    #server
    #clients

    constructor(server) {
        this.#server = server;
        this.#clients = [];
    }

    handleSocket(socket) {
        console.log(`New client connected with id ${socket.id}`);
        this.#clients.push(socket);
        setInterval(this.randomNumber.bind(this), 2000);
    }

    randomNumber() {
        //même nombre pour chaque client
        /*const random = Math.floor(Math.random() * 10);
        this.#server.emit('newNumber', random);*/

        //nombre différent pour chaque client
        this.#clients.forEach(socket => {
            const random = Math.floor(Math.random() * 10);
            this.#server.to(socket.id).emit('newNumber', random);
            console.log(`Number ${random} sent to user ${socket.id}`);
        });
    }

}