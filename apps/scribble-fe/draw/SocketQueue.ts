
type OutgoingMessage = object;

export class SocketQueue {
    private queue: OutgoingMessage[] = [];
    private socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
        this.setSocket(socket);
    }

    setSocket(socket: WebSocket) {
        this.socket = socket;
        this.socket.addEventListener("open", () => {
            this.flush();
        });
    }

    send(message: OutgoingMessage) {
        this.queue.push(message);
        this.flush();
    }

    private flush() {
        if (this.socket.readyState !== WebSocket.OPEN) {
            return;
        }

        while (this.queue.length > 0) {
            const msg = this.queue[0];

            try {
                this.socket.send(JSON.stringify(msg));
                this.queue.shift();
            } catch (err) {
                console.warn("Socket send failed, will retry", err);
                break;
            }
        }
    }
}