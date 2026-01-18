import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Search } from "./pages/search";
import { Favorites } from "./pages/favorites";
import { MovieDetails } from "./pages/movieDetail";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Settings } from "./pages/settings";
import { Layout } from "./component/layout";
import { NotFound } from "./pages/notFound";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UserPublic } from "./pages/userPublic";

import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Auth401Redirect() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    function onUnauthorized() {
      // on redirige seulement si on était "connecté" (sinon boucle possible)
      if (isAuthenticated) navigate("/login");
    }

    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [isAuthenticated, navigate]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <Layout>
            <Auth401Redirect />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/:username" element={<UserPublic />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
