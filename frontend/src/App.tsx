import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewTasksPage from "./pages/ViewTasksPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import GlobalLayout from "./pages/GlobalLayout";
import DashboardPage from "./pages/DashboardPage";
import { UserProvider } from "./context/UserContext";
import { GameStateProvider } from "./context/GameStateContext";

function App() {
  return (
    <GlobalLayout>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <GameStateProvider>
                <DashboardPage />
              </GameStateProvider>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </GlobalLayout>
  );
}

export default App;
