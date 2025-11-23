import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Search } from "./pages/search";
import { Favorites } from "./pages/favorites";
import { MovieDetails } from "./pages/movieDetail";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Settings } from "./pages/settings";
import { Layout } from "./component/layout";
import { NotFound } from "./pages/notFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
