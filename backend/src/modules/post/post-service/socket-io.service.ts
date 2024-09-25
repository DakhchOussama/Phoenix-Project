import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketIoService {
    private server: Server;

    public setServer(server: Server) {
        this.server = server;
    }

    public emitPosts(posts: any[]) {
        if (this.server) {
            this.server.emit('posts', posts); // Emit the posts to all connected clients
        }
    }
}
