import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({cors:true})
export class WebsocketGateway {
  @WebSocketServer() server: Server;

  afterInit(server:Server){
    console.log('Started websocket, Listening for new connections');
  }

  sendData(payload: any): string {
    this.server.emit("data",payload);
    return payload;
  }
} 
