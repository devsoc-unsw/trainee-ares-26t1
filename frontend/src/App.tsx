import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewTasksPage from "./pages/ViewTasksPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import GlobalLayout from "./pages/GlobalLayout";
import DashboardPage from "./pages/DashboardPage";
import { UserProvider, useUser } from "./context/UserContext";
import { GameStateProvider } from "./context/GameStateContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  if (isLoading) return null; // AppInit already handles this, just a safety net
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppInit({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}

function App() {
  return (
    <GlobalLayout>
      <UserProvider>
        <AppInit>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <GameStateProvider>
                    <DashboardPage />
                  </GameStateProvider>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppInit>
      </UserProvider>
    </GlobalLayout>
  );
}

export default App;
