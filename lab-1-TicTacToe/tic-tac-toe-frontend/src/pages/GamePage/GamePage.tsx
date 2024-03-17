import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game, PlayerTurn, MoveDto } from "../../api/types";
import { getGame } from "../../api/ticTacToeApi";
import GameBoard from "../../components/GameBoard/GameBoard";
import useWebsockets from "../../hooks/useWebsockets";

const GamePage = () => {
  let { id: game_id, playerTurn } = useParams<{
    id: string;
    playerTurn: PlayerTurn;
  }>();
  const [game, setGame] = useState<Game | null>(null);
  const socket = useWebsockets();

  const handleMakingMove = (position: number) => {
    if (!!!playerTurn || !!!game_id) return;
    const move: MoveDto = {
      playerTurn: playerTurn,
      positionX: position % 3,
      positionY: Math.floor(position / 3),
      gameId: game_id as unknown as number,
    };

    socket.emit("move", move);
  };

  const handleBoardMove = () => {
    socket.on("move", (move: MoveDto) => {
      fetchGame();
      // if (move.gameId === Number(game_id)) {
      //   fetchGame();
      // }
    });
  };

  const fetchGame = async () => {
    if (typeof game_id === "string") {
      const game = game_id ? await getGame(game_id as unknown as number) : null;
      setGame(game);
    }
  };

  useEffect(() => {
    fetchGame();
    socket.on("move", handleBoardMove);
  }, []);

  return (
    <div>
      <GameBoard game={game} onClick={handleMakingMove} />
    </div>
  );
};

export default GamePage;
