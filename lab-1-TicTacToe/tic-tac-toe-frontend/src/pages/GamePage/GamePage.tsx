import "./GamePage.style.scss";
import useGamePage from "./useGamePage";
import GameBoard from "../../components/GameBoard/GameBoard";

const GamePage = () => {
  const { game, isPending, handleMakingMove } = useGamePage();

  return (
    <div>
      {isPending ? (
        <div>
          <div className="loading-page-text">
            Waiting for other player to join
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <GameBoard game={game} onClick={handleMakingMove} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
