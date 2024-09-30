// socketService.ts
import { io } from "socket.io-client";
import { BASE_URL } from '@env';

let socket: any;

export const connectSocket = () => {
    if (!socket) {
        socket = io(BASE_URL, {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => {
    return socket;
};
