import useWebsockets from "../../hooks/useWebsockets";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game, PlayerTurn, MoveDto, GameStatus } from "../../api/types";
import { getGame, joinGame } from "../../api/ticTacToeApi";

const useGamePage = () => {
  const { id: game_id, playerTurn } = useParams<{
    id: string;
    playerTurn: PlayerTurn;
  }>();

  const [game, setGame] = useState<Game | null>(null);
  const [isPending, setIsPending] = useState(true);
  const socket = useWebsockets();

  useEffect(() => {
    fetchGame();
    socket.listenForMove(Number(game_id), () => {
      fetchGame();
    });
  }, []);

  useEffect(() => {
    checkGameStatus();
    return () => socket.unListenForJoinGame(Number(game_id));
  }, []);

  const fetchGame = useCallback(async () => {
    if (typeof game_id !== "string") return null;
    const game = game_id ? await getGame(game_id as unknown as number) : null;
    setGame(game);
    if (game?.status !== GameStatus.PENDING) {
      setIsPending(false);
    }
    return game;
  }, [game_id]);

  const handleJoinGame = useCallback(async () => {
    const game = await fetchGame();
    if (game?.status === GameStatus.IN_PROGRESS) {
      setIsPending(false);
      setGame(game);
    }
  }, [fetchGame]);

  const checkGameStatus = useCallback(async () => {
    const game = await joinGame(Number(game_id), playerTurn as PlayerTurn);
    if (game.status === GameStatus.IN_PROGRESS) {
      setIsPending(false);
    }
    socket.joinGame(Number(game_id), playerTurn as PlayerTurn);
    socket.listenForJoinGame(Number(game_id), () => {
      handleJoinGame();
    });
  }, [game_id, playerTurn, socket, handleJoinGame]);

  const handleMakingMove = (position: number) => {
    if (!playerTurn || !game_id) return;
    const move: MoveDto = {
      playerTurn: playerTurn,
      positionX: position % 3,
      positionY: Math.floor(position / 3),
      gameId: game_id as unknown as number,
    };

    socket.makeMove(move);
  };

  return { game, isPending, handleMakingMove, playerTurn };
};

export default useGamePage;
