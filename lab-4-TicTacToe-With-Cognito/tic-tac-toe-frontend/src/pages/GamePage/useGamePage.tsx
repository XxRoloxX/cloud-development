import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game, PlayerTurn, MoveDto, GameStatus } from "../../api/types";
import { getGame } from "../../api/ticTacToeApi";
import useAuth from "../../providers/useAuth";
import useWebsockets from "../../providers/useWebsockets";

const useGamePage = () => {
  const { id: game_id, playerTurn } = useParams<{
    id: string;
    playerTurn: PlayerTurn;
  }>();

  const [game, setGame] = useState<Game | null>(null);
  const [isPending, setIsPending] = useState(true);
  const { email } = useAuth();
  const { gameSocket } = useWebsockets();

  useEffect(() => {
    gameSocket.listenForMove((move: MoveDto) => {
      console.log("Move received");
      if (!game) {
        fetchGame();
      } else {
        updateGame(move);
      }
    });
  }, []);

  useEffect(() => {
    checkGameStatus();
    return () => gameSocket.unListenForJoinGame();
  }, [email, gameSocket]);

  const updateGame = (move: MoveDto) => {
    setGame((prevGame) => {
      if (!prevGame) return null;
      const newGame = { ...prevGame };
      newGame.moves.push(move);
      return newGame;
    });
  };

  const fetchGame = useCallback(async () => {
    if (typeof game_id !== "string") return null;
    // console.log("FETCHING GAME", game_id);
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
    if (game?.status === GameStatus.IN_PROGRESS) {
      setIsPending(false);
    }

    gameSocket.listenForJoinGame(() => {
      handleJoinGame();
    });

    if (email && game_id && playerTurn) {
      gameSocket.joinGame({
        gameId: game_id!,
        playerId: email!,
        playerTurn: playerTurn!,
      });
    }
  }, [game?.status, gameSocket, email, game_id, playerTurn, handleJoinGame]);

  const handleMakingMove = (position: number) => {
    if (!playerTurn || !game_id) return;
    const move: MoveDto = {
      playerTurn: playerTurn,
      positionX: position % 3,
      positionY: Math.floor(position / 3),
      gameId: game_id as unknown as number,
      playerId: email!,
    };

    gameSocket.makeMove(move);
  };

  return { game, isPending, handleMakingMove, playerTurn };
};

export default useGamePage;
