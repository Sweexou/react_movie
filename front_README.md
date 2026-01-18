# 🎬 Movie App — Frontend (React)

Frontend de l’application **Movie App**, développé en **React**.
Il consomme une API REST fournie par le backend Node/Express via un **proxy `/api`**.

---

## 🧱 Stack technique

- React + TypeScript
- React Router
- Context API (Auth, Favorites, Theme)
- Fetch API (centralisée)
- Vite

---

## ⚙️ Prérequis

- Node.js ≥ 18
- npm
- Backend lancé (voir README du back)

---

## 📦 Installation

Depuis le dossier `front` :

```bash
npm install
```

---

## 🔧 Configuration

Créer un fichier `.env` à la racine du front :

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

> Le frontend utilise un **proxy** :  
> toutes les requêtes `/api/*` sont automatiquement redirigées vers le backend.

---

## ▶️ Lancer l’application

```bash
npm run dev
```

L’application est accessible sur :

```
http://localhost:3000
```

---

## 🔐 Fonctionnalités principales

### Utilisateur non connecté
- Voir la liste des films
- Rechercher un film
- Voir le détail d’un film
- Lire les reviews
- Voir la fiche publique d’un utilisateur

### Utilisateur connecté
- Register / Login / Logout (JWT)
- Session persistante
- Ajouter / supprimer des favoris (serveur)
- Créer une review
- Éditer / supprimer **ses** reviews
- Accès protégé à la page Favorites
- Gestion automatique des erreurs 401 (déconnexion)

---

## 🎨 UI / UX

- Support **Light / Dark mode**
- UI responsive
- Styles CSS custom (sans framework)

---

## 🧪 Notes importantes

- Le frontend **ne connaît jamais l’URL réelle du backend**
- Tous les appels API sont centralisés dans `src/services/api.ts`
- L’application est conçue pour être **mockable**

---

## 📁 Structure simplifiée

```
src/
 ├── pages/
 ├── component/
 ├── context/
 ├── services/
 ├── style/
 └── types/
```

---

## ✅ État du projet

✔️ Conforme aux attendus du rendu Fullstack React / Node  
✔️ Fonctionnel en local
