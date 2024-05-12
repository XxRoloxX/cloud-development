import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { GameService } from "./game.service";
import { MoveDto } from "./dto/move.dto";
import { GameEntity } from "src/entity/game.entity";
import { UseGuards } from "@nestjs/common";
import { WsGuard } from "../auth/guards/ws.guard";
import { ConnectedSocket } from "@nestjs/websockets";
import { Socket } from 'socket.io'
import { JoinGameDto } from './dto/join-game.dto'
import IAuthService from 'src/auth/interfaces/auth.interface';

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  constructor(private readonly gameService: GameService, private readonly authService: IAuthService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("join")
  async handleJoinGame(@ConnectedSocket() client: Socket, @MessageBody() data: JoinGameDto) {
    try {
      await this.gameService.joinGame(data)
      client.join(data.gameId);
      this.server.emit(`announce-join`, data)
    } catch (e) {
      console.log(e)
    }
  }

  @SubscribeMessage("move")
  async handleMove(@ConnectedSocket() client: Socket, @MessageBody() move: MoveDto) {
    try {
      if (client.rooms.has(move.gameId) === false) {
        console.error('Client not in game room')
        return
      }

      const { Username } = await this.authService.verify(
        WsGuard.getAccessTokenFromAuthorizationHeader(client.handshake.headers.authorization)
      );

      console.log(Username)
      console.log(move.playerId)

      if (move.playerId !== Username) {
        console.error('Invalid player')
        return
      }

      await this.gameService.makeMove(move)
      this.server.to(move.gameId).emit(`move`, move)
    } catch (e) {
      console.log(e)
    }
  }

  announceJoinGame(joinGameDto: JoinGameDto) {
    this.server.emit(`announce-join`, joinGameDto)
  }

  announceNewGame(game: GameEntity) {
    this.server.emit('announce-new-game', game);
  }
}
