import "./App.css";
import "./styles/global.css";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import AddProfilePage from "./pages/AddProfilePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileIndexPage from "./pages/ProfileIndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ModeContext, ModeProvider } from "./contexts/ModeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const { mode } = useContext(ModeContext);

  return (
    <AuthProvider>
    
      <HashRouter>
        <header>
          <Navbar />
        </header>
        <main className={mode === "light" ? "light" : "dark"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/add-profile" element={
              <ProtectedRoute>
                <AddProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/profile/:id" element={<ProfileIndexPage />}>
              <Route index element={<ProfileDetailPage />} />
              <Route path="edit" element={<ProfileEditPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<LoginPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </HashRouter>
   
    </AuthProvider>
  );
};

export default App;