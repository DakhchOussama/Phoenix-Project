import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Adjust as needed
    },
  })
  export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: any) {
      console.log('Client connected:', client.id);
    }
  
    handleDisconnect(client: any) {
      console.log('Client disconnected:', client.id);
    }
  
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
      this.server.emit('message', payload);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, userId: string) {
      client.join(userId);
      // console.log('done');
    }
  }
  