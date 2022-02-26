export default class IOController {
    #server
    #clients

    constructor(server) {
        this.#server = server;
        this.#clients = []
    }

    handleSocket(socket) {
        console.log(`New client connected with id ${socket.id}`);
        this.connectClient(socket)
        this.acceptClient(socket)
        this.handlePaddleMovementMessagesToClients(socket)
        this.disconnectClient(socket)
    }

    connectClient(socket) {
        if(this.#clients.length >= 2) {
            this.#server.to(socket.id).emit('TooMuchConnections');
            console.log(`Client ${socket.id} disconnected due to a large number of players`);
            socket.disconnect(true)
        }
        else {
            this.#clients.push(socket)
        }
    }

    acceptClient(socket) {
        if(this.#clients.length == 1) {
            this.#server.to(socket.id).emit('firstPlayer');
        }
        else {
            this.#server.to(socket.id).emit('secondPlayer');
            this.#clients.forEach((socket) => {
                this.#server.to(socket.id).emit('startGame');
            })
        }
    }

    findIndexOfSocket(socket) {
        const index = this.#clients.indexOf(socket)
        let indexToEmit
        if(index == 0) {
            indexToEmit = 1
        }
        if(index == 1) {
            indexToEmit = 0
        }
        return indexToEmit
    }

    disconnectClient(socket) {
        socket.on('disconnected', () => {
            const indexToEmit = this.findIndexOfSocket(socket)
            if(this.#clients.length > 1) {
                this.#server.to(this.#clients[indexToEmit].id).emit('otherPlayerDisconnected');
            }
            this.#clients.splice(indexToEmit, 1)
            console.log(`Client ${socket.id} disconnected`)
        });
        socket.on('disconnect', () => {
            const indexToEmit = this.findIndexOfSocket(socket)
            this.#clients.splice(indexToEmit, 1)
            console.log(`Client ${socket.id} disconnected`)
        });
    }

    handlePaddleMovementMessagesToClients(socket) {
        socket.on('moveUpRight', () => {
            this.#server.to(this.#clients[0].id).emit('moveUpRight')
        })
        socket.on('moveDownRight', () => {
            this.#server.to(this.#clients[0].id).emit('moveDownRight')
        })
        socket.on('moveUpLeft', () => {
            this.#server.to(this.#clients[1].id).emit('moveUpLeft')
        })
        socket.on('moveDownLeft', () => {
            this.#server.to(this.#clients[1].id).emit('moveDownLeft')
        })
    }
}