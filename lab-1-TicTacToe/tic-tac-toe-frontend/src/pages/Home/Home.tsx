import { Link } from "react-router-dom";
import "./Home.style.scss";
import { createGame, getAllGames } from "../../api/ticTacToeApi";
import { useEffect, useState } from "react";
import { Game } from "../../api/types";
import useWebsockets from "../../hooks/useWebsockets";

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);

  const socket = useWebsockets();

  const fetchGames = async () => {
    try {
      const games = await getAllGames();
      setGames(games);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleNewGame = () => {
      socket.listenForNewGame(() => {
        fetchGames();
      });
    };
    handleNewGame();
    fetchGames();
    return () => {
      socket.unListenForNewGame();
    };
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Tic Tac Toe</h1>
      <div className="home-page__components">
        <div className="game-list">
          <p className="game-list__title">Join a game</p>
          {games.map((game: Game) => {
            return (
              <div className="game-list__item" key={game.id}>
                <Link
                  to={`/game/${game.id}/Player1`}
                  className="game-list__item"
                  key={game.id}
                >
                  Game {game.id} Player 1
                </Link>
                <Link
                  to={`/game/${game.id}/Player2`}
                  className="game-list__item"
                  key={game.id}
                >
                  Game {game.id} Player 2
                </Link>
              </div>
            );
          })}
        </div>
        <div className="game-creation">
          <div className="game-creation__title">Or create a new one</div>
          <button
            onClick={() => {
              createGame();
            }}
          >
            Create new game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
