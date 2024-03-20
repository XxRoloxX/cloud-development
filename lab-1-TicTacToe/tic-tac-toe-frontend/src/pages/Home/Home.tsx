import "./Home.style.scss";
import { createGame, getAllGames } from "../../api/ticTacToeApi";
import { useEffect, useState } from "react";
import { Game, PlayerTurn } from "../../api/types";
import useWebsockets from "../../hooks/useWebsockets";
import JoinGameLink from "./JoinGameLink";
import { usePlayer } from "../../hooks/playerNameContext";
import RandomGameJoinLink from "./RandomGameJoinLink";

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { setPlayerName } = usePlayer();

  const socket = useWebsockets();

  const fetchGames = async () => {
    try {
      const games = await getAllGames();
      setGames(games);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlayerName(event.target.value);
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
      <div className="home-page__player-name">
        <label className="home-page__player-name__label">Enter your name</label>
        <input
          className="home-page__player-name__input"
          onChange={handlePlayerNameChange}
        />
      </div>

      <RandomGameJoinLink games={games} />
      <div className="home-page__components">
        <div className="game-list">
          <p className="game-list__title">Join a game</p>
          {games.map((game: Game) => {
            return (
              <div className="game-list__item" key={game.id}>
                <div className="game-list__description">Game {game.id}</div>
                <JoinGameLink game={game} playerTurn={PlayerTurn.Player1} />
                <JoinGameLink game={game} playerTurn={PlayerTurn.Player2} />
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
