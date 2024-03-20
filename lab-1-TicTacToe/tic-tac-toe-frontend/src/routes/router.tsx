import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import GamePage from "../pages/GamePage/GamePage";
import Navbar from "../components/Navbar/Navbar";
import { PlayerNameProvider } from "../hooks/playerNameContext";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PlayerNameProvider />}>
          <Route path="/game/:id/:playerTurn" element={<GamePage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
