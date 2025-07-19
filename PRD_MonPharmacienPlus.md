# PRD - MonPharmacien+ (Mobile App)

## 1. Objectif
Développer une application mobile moderne et responsive permettant aux citoyens de trouver facilement les **pharmacies ouvertes**, **de garde**, **de nuit** autour d'eux, avec **géolocalisation**, **recherche par ville**, et **notifications push** pour les alertes locales (ex : changement de garde).

---

## 2. Technologies

### Frontend (Mobile)
- **Framework**: [Ionic Framework](https://ionicframework.com/)
- **Langage**: React.js
- **CSS**: Tailwind CSS (intégré à Ionic via PostCSS)
- **Carte**: Leaflet.js (via Capacitor + plugin React-Leaflet)

### Backend
- **Langage**: Java
- **Framework**: Spring Boot
- **Base de données**: PostgreSQL avec extension **PostGIS** (pour géolocalisation)
- **Authentification**: JWT (JSON Web Token)
- **API REST** exposée pour le frontend

### Autres
- **Notifications push**: Capacitor Push Notifications + Firebase Cloud Messaging (FCM)
- **Déploiement local**: Docker + Docker Compose

---

## 3. Fonctionnalités principales

### Utilisateur (mobile)
- 🔍 Rechercher une pharmacie par **ville**
- 📍 Voir les pharmacies **autour de soi** (géolocalisation)
- 🌙 Filtres : **De garde**, **De nuit**, **Ouvertes maintenant**
- 🗺️ Carte interactive avec marqueurs + popup d'infos
- 🔔 Notifications push si une pharmacie change de statut ou selon une alerte
- 🧾 Liste triée des pharmacies avec infos : nom, adresse, horaires

### Admin (web)
- 🔐 Authentification admin via JWT
- ✏️ Ajouter / modifier / supprimer des pharmacies
- 📍 Gérer horaires, localisation, statuts (garde/nuit/ouvert)
- 🔔 Pousser une alerte via notification

---

## 4. Données

### Table `pharmacies`
- `id`: UUID
- `nom`: string
- `adresse`: string
- `ville`: string
- `latitude`: float
- `longitude`: float
- `ouverte`: boolean
- `garde`: boolean
- `nuit`: boolean
- `ouverture`: time
- `fermeture`: time

### Table `admin`
- `id`: UUID
- `username`: string
- `password_hash`: string

---

## 5. API Backend (exemples)

### Auth
- `POST /api/auth/login` → { username, password } → { token }

### Pharmacies
- `GET /api/pharmacies` → ?ville=paris&ouverte=true
- `GET /api/pharmacies/nearby?lat=48.8&lon=2.3`
- `POST /api/pharmacies` (admin only)
- `PUT /api/pharmacies/{id}`
- `DELETE /api/pharmacies/{id}`

---

## 6. Notifications Push
- Firebase Cloud Messaging (FCM) intégré via Capacitor
- Backend envoie une requête POST à FCM
- Exemple : "Nouvelle pharmacie de garde à Montreuil"

---

## 7. Maquettes (wireframes simplifiés)

### Écran Accueil
- Input de recherche par ville
- Filtres (Garde / Nuit / Ouverte)
- Liste + Carte

### Écran Carte
- Affichage Leaflet avec marqueurs

### Écran Détails
- Nom, adresse, horaires, bouton itinéraire

### Écran Login Admin
- Formulaire (username / password)

---

## 8. Responsive & Accessibilité
- Interface adaptée aux **mobiles**, **tablettes**
- Couleurs contrastées / polices lisibles
- Prise en charge mode sombre

---

## 9. Déploiement (local/dev)
- Docker Compose (backend, frontend, db)
- Port 3000 : App mobile en dev
- Port 8080 : API backend
- Port 5432 : PostgreSQL
