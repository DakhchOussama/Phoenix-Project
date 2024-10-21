// socketService.ts
import { io } from "socket.io-client";
import { BASE_URL } from '@env';
import { getprofileuser } from "./authService";

let socket: any;

export const connectSocket = () => {
    if (!socket) {
        socket = io(BASE_URL, {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            createRoom();
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        const createRoom = async () => {
            const data = await getprofileuser();
            if (data && data.UserID) {
                // Join the user's specific room
                socket.emit('joinRoom', data.UserID);
            }
        };

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
