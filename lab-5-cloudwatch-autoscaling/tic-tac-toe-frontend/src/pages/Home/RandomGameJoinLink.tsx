import { Link } from "react-router-dom";
import { Game, GameStatus, PlayerTurn } from "../../api/types";

const RandomGameJoinLink = (props: { games: Game[] }) => {
  const getRandomGameWithPlayers = () =>
    props.games.filter(
      (game) =>
        game.status === GameStatus.PENDING &&
        game.player1_id &&
        game.player2_id,
    );
  const getRandomGame = () => {
    const pendingGames = getRandomGameWithPlayers();

    if (pendingGames.length === 0) {
      return props.games[Math.floor(Math.random() * props.games.length)];
    }

    return pendingGames[Math.floor(Math.random() * pendingGames.length)];
  };

  if (props.games.length === 0) {
    return null;
  }

  const getAvailableTurn = (game: Game) => {
    if (!game.player1_id) {
      return PlayerTurn.Player1;
    }
    if (!game.player2_id) {
      return PlayerTurn.Player2;
    }
    return null;
  };

  const game = getRandomGame();

  return (
    <Link
      to={`/game/${game.id}/${getAvailableTurn(game)}`}
      className={"game-list__join-link--random"}
    >
      Random Game
    </Link>
  );
};

export default RandomGameJoinLink;
