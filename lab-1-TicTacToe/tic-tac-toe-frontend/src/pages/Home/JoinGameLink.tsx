import { Link } from "react-router-dom";
import { Game, PlayerTurn } from "../../api/types";
import "./Home.style.scss";

const JoinGameLink = ({
  game,
  playerTurn,
}: {
  game: Game;
  playerTurn: PlayerTurn;
}) => {
  const isSlotFree = () => {
    if (playerTurn === PlayerTurn.Player1) {
      return !game.player1_id;
    }
    return !game.player2_id;
  };

  const mapPlayerToTurnIcon = () => {
    return playerTurn === PlayerTurn.Player1 ? "X" : "O";
  };

  return (
    <Link
      to={`/game/${game.id}/${playerTurn}`}
      className={
        isSlotFree()
          ? "game-list__join-link--active"
          : "game-list__join-link--inactive"
      }
    >
      {mapPlayerToTurnIcon()}
    </Link>
  );
};

export default JoinGameLink;
