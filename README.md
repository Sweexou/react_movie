# 🎬 React Movie Finder — Projet React

Ce projet est une application React permettant d’afficher des films via l’API TMDB, de rechercher des films, de gérer une liste de favoris et de basculer entre un thème clair / sombre (dark mode).  
Il s’agit du projet du module **ReactJS — Web Full Stack M1**.

---

## 🚀 Fonctionnalités

- Page d’accueil affichant les films populaires
- Page de recherche avec pagination
- Page détails d’un film
- Système de favoris (LocalStorage + Context API)
- Page “Mes favoris”
- Dark mode / Light mode avec sauvegarde du choix utilisateur
- Routing complet avec React Router
- Composants réutilisables (Cards, Grid, Layout)
- Optimisations React :
  - `React.memo`
  - `useMemo`
  - `useCallback`

---

## 🛠️ Technologies utilisées

- **React 18+**
- **Vite**
- **TypeScript**
- **React Router**
- **Context API**
- **lucide-react** (icônes)
- **Fetch API**
- **CSS responsive**

---

## 📦 Installation

Cloner le dépôt :

> git clone <https://github.com/Sweexou/react_movie.git>
> cd react-movie

Installer les dépendances :

> npm install

## 🔑 Configuration API (OBLIGATOIRE)

Créer un fichier .env à la racine du projet contenant :

VITE_API_KEY="validApiKey"

remplacer "validApiKey" par une clé api valide pouvant etre obtenu sur le site: https://www.themoviedb.org/?language=fr

## ▶️ Lancer l’application

> npm run dev

L’application sera accessible sur :

http://localhost:5173

## 📦 Build de production

> npm run build