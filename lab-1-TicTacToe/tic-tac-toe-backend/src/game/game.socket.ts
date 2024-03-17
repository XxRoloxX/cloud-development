import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "./game.service";
import { Move, PlayerTurn } from "src/common/game";
import { MoveDto } from "./dto/move.dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  constructor(private readonly gameService: GameService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("join-game")
  handleJoinGame(@MessageBody() data: any) {
    console.log("join-game")
    console.log(data)
    // client.join(payload.gameId);
  }
  @SubscribeMessage("move")
  handleMove(@MessageBody() move: MoveDto) {
    console.log(move)
    try {
      this.gameService.makeMove(move)
    } catch (e) {
      console.log(e)
    }
    // client.join(payload.gameId);
  }
}
