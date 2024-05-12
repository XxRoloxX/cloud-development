import { Link } from "react-router-dom";
import { Game, PlayerTurn } from "../../api/types";
import "./Home.style.scss";

const JoinGameLink = ({
  game,
  playerTurn,
}: {
  game: Game;
  playerTurn: PlayerTurn | null;
}) => {
  const isSlotFree = () => {
    if (playerTurn === PlayerTurn.Player1) {
      return !game.player1_id;
    }
    return !game.player2_id;
  };

  const mapPlayerToTurnIcon = () => {
    if (playerTurn === null) {
      return "Random game";
    }
    return playerTurn === PlayerTurn.Player1 ? "X" : "O";
  };

  return isSlotFree() ? (
    <Link
      to={`/game/${game.id}/${playerTurn}`}
      className={"game-list__join-link--active"}
    >
      {mapPlayerToTurnIcon()}
    </Link>
  ) : (
    <div className={"game-list__join-link--inactive"}>
      {mapPlayerToTurnIcon()}
    </div>
  );
};

export default JoinGameLink;
