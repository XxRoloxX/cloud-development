import "./GamePage.style.scss";
import useGamePage from "./useGamePage";
import GameBoard from "../../components/GameBoard/GameBoard";
import { GameStatus, PlayerTurn } from "../../api/types";

const GamePage = () => {
  const {
    game,
    isPending,
    handleMakingMove,
    playerTurn,
    playerProfiles,
    previouseResults,
  } = useGamePage();

  const mapGameStatusToText = (status: GameStatus) => {
    switch (status) {
      case GameStatus.PLAYER1_WON:
        return `You ${playerTurn == PlayerTurn.Player1 ? "won" : "lost"}!`;
      case GameStatus.PLAYER2_WON:
        return `You ${playerTurn == PlayerTurn.Player1 ? "lost" : "won"}!`;
      case GameStatus.DRAW:
        return "It's a draw!";
      case GameStatus.IN_PROGRESS:
        return `It's ${playerTurn == game?.currentTurn ? "your" : "your opponent's"} turn`;
      default:
        return "";
    }
  };

  return (
    <div className="game-page-container">
      {isPending ? (
        <div>
          <div className="loading-page-text">
            Waiting for other player to join
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="game-players-container">
            <div className="player-info">
              <div className="player-info__symbol">{"X"}</div>
              <div className="player-info__name">
                {playerProfiles?.player1.username}
              </div>
              <img
                className="player-info__picture"
                src={playerProfiles?.player1.profilePictureUrl}
              />
            </div>
            <div className="player-previous-results">
              <h1>{previouseResults?.player1Wins}</h1>
              <h1>:</h1>
              <h1>{previouseResults?.player2Wins}</h1>
            </div>
            <div className="player-info">
              <div className="player-info__symbol">{"O"}</div>
              <div className="player-info__name">
                {playerProfiles?.player2.username}
              </div>
              <img
                className="player-info__picture"
                src={playerProfiles?.player2.profilePictureUrl}
              />
            </div>
          </div>
          <div className="game-status">
            {game ? mapGameStatusToText(game?.status) : ""}
          </div>
          <GameBoard game={game} onClick={handleMakingMove} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
