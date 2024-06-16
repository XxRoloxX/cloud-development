import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game, PlayerTurn, MoveDto, GameStatus } from "../../api/types";
import {
  PreviousResults,
  getGame,
  getPreviousResults,
  getUserProfile,
} from "../../api/ticTacToeApi";
import useAuth from "../../providers/useAuth";
import useWebsockets from "../../providers/useWebsockets";
import { UserProfile } from "../../api/ticTacToeApi";

interface PlayerProfiles {
  player1: UserProfile;
  player2: UserProfile;
}

const useGamePage = () => {
  const { id: game_id, playerTurn } = useParams<{
    id: string;
    playerTurn: PlayerTurn;
  }>();

  const [game, setGame] = useState<Game | null>(null);
  const [playerProfiles, setPlayerProfiles] = useState<PlayerProfiles | null>(
    null,
  );
  const [isPending, setIsPending] = useState(true);
  const { userId } = useAuth();
  const { gameSocket } = useWebsockets();
  const [previouseResults, setPreviousResults] =
    useState<PreviousResults | null>(null);

  useEffect(() => {
    gameSocket.listenForMove((move: MoveDto) => {
      if (!game) {
        fetchGame();
      } else {
        updateGame(move);
      }
    });
    return () => gameSocket.unListenForMove();
  }, []);

  useEffect(() => {
    checkGameStatus();
    return () => gameSocket.unListenForJoinGame();
  }, [userId, gameSocket]);

  useEffect(() => {
    handleSettingPlayerProfiles();
    handleSettingPreviousResults();
  }, [game?.status, game?.player1_id, game?.player2_id]);

  const updateGame = (move: MoveDto) => {
    setGame((prevGame) => {
      if (!prevGame) return null;
      const newGame = { ...prevGame };
      newGame.moves.push(move);
      return newGame;
    });
  };

  const handleSettingPreviousResults = useCallback(async () => {
    if (!game || !game.player1_id || !game.player2_id) return;
    const results = await getPreviousResults(game.player1_id, game.player2_id);
    setPreviousResults(results);
  }, [game]);

  const handleSettingPlayerProfiles = useCallback(async () => {
    if (!game || !game.player1_id || !game.player2_id) return;
    const player1 = await getUserProfile(game.player1_id!);
    const player2 = await getUserProfile(game.player2_id!);
    setPlayerProfiles({ player1, player2 });
  }, [game]);

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
    if (game?.status === GameStatus.IN_PROGRESS) {
      setIsPending(false);
    }

    gameSocket.listenForJoinGame(() => {
      handleJoinGame();
    });

    if (userId && game_id && playerTurn) {
      gameSocket.joinGame({
        gameId: game_id!,
        playerId: userId!,
        playerTurn: playerTurn!,
      });
    }
  }, [game?.status, gameSocket, userId, game_id, playerTurn, handleJoinGame]);

  const handleMakingMove = (position: number) => {
    if (!playerTurn || !game_id) return;
    const move: MoveDto = {
      playerTurn: playerTurn,
      positionX: position % 3,
      positionY: Math.floor(position / 3),
      gameId: game_id as unknown as number,
      playerId: userId!,
    };

    gameSocket.makeMove(move);
  };

  return {
    game,
    isPending,
    handleMakingMove,
    playerTurn,
    playerProfiles,
    previouseResults,
  };
};

export default useGamePage;
