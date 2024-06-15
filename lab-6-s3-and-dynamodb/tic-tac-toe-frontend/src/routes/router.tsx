import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import GamePage from "../pages/GamePage/GamePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import ConfirmAccountPage from "../pages/ConfirmAccountPage/ConfirmAccountPage";
import { AuthProvider } from "../providers/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import { WebsocketProvider } from "../providers/WebsocketProvider";
import UploadProfilePicturePage from "../pages/UploadProfilePicturePage/UploadProfilePicturePage";
import { PlayerProvider } from "../hooks/playerNameContext";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthProvider />}>
          <Route path="/" element={<WebsocketProvider />}>
            <Route path="/" element={<PlayerProvider />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/confirm" element={<ConfirmAccountPage />} />
              <Route
                path="/upload-picture"
                element={<UploadProfilePicturePage />}
              />
              <Route path="/" element={<Navbar />}>
                <Route path="/game/:id/:playerTurn" element={<GamePage />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
