import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Search } from './pages/search'
import { Favorites } from './pages/favorites'
import { MovieDetails } from './pages/movieDetail'
import { FavoritesProvider } from './context/FavoritesContext' // <-- ajouté
import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* Fournit le contexte de favoris à toute l'app */}
      <FavoritesProvider>
        <nav
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#222',
            color: 'white',
          }}
        >
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>
            Search
          </Link>
          <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>
            Favorites ❤️
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
