import "./Home.style.scss";
import { createGame, getAllGames } from "../../api/ticTacToeApi";
import { useEffect, useState } from "react";
import { Game, PlayerTurn } from "../../api/types";
import JoinGameLink from "./JoinGameLink";
import RandomGameJoinLink from "./RandomGameJoinLink";
// import useAuth from "../../providers/useAuth";
import useWebsockets from "../../providers/useWebsockets";

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const { gameSocket } = useWebsockets();

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
      gameSocket.listenForNewGame(() => {
        fetchGames();
      });
      gameSocket.listenForJoinGame(() => {
        console.log("Got the join game event");
        fetchGames();
      });
    };
    handleNewGame();
    fetchGames();
    return () => {
      gameSocket.unListenForNewGame();
    };
  }, [gameSocket]);

  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Tic Tac Toe</h1>
      <div className="home-page__player-name"></div>

      <RandomGameJoinLink games={games} />
      <div className="home-page__components">
        <div className="game-list">
          <p className="game-list__title">Join a game</p>
          {games && games.length > 0
            ? games.map((game: Game) => {
              return (
                <div className="game-list__item" key={game.id}>
                  <div className="game-list__description">Game {game.id}</div>
                  <JoinGameLink game={game} playerTurn={PlayerTurn.Player1} />
                  <JoinGameLink game={game} playerTurn={PlayerTurn.Player2} />
                </div>
              );
            })
            : ""}
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
