import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { GameService } from "./game.service";
import { MoveDto } from "./dto/move.dto";
import { GameEntity } from "src/entity/game.entity";
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  constructor(private readonly gameService: GameService) { }

  @WebSocketServer()
  server: Server;

  // @SubscribeMessage("join")
  // handleJoinGame(@MessageBody() data: any) {
  //   console.log("join-game")
  //   console.log(data)
  //   this.server.emit(`join/${data.gameId}`, data)
  //   // client.join(payload.gameId);
  // }
  @SubscribeMessage("move")
  handleMove(@MessageBody() move: MoveDto) {
    try {
      this.gameService.makeMove(move)
      this.server.emit(`move/${move.gameId}`, move)
    } catch (e) {
      console.log(e)
    }
  }

  announceJoinGame(game: GameEntity) {
    this.server.emit(`join/${game.id}`, game)
  }

  announceNewGame(game: GameEntity) {
    this.server.emit('new-game', game);
  }
}
