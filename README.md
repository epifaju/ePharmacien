# ePharmacien - Application Mobile de Pharmacies

Une application mobile moderne pour trouver les pharmacies ouvertes, de garde et de nuit autour de vous, inspirée de "MonPharmacien".

## 🚀 Technologies Utilisées

### Frontend

- **Ionic Framework** + **React.js**
- **Tailwind CSS** pour le styling
- **Leaflet.js** pour les cartes interactives
- **TypeScript** pour la sécurité des types

### Backend

- **Spring Boot** (Java 17)
- **PostgreSQL** avec extension **PostGIS** pour la géolocalisation
- **JWT** pour l'authentification
- **Spring Security** pour la sécurité

### Infrastructure

- **Docker Compose** pour le déploiement local
- **PostGIS** pour les requêtes géospatiales

## 📱 Fonctionnalités

### Pour les Utilisateurs

- 🔍 **Recherche par ville** et géolocalisation
- 📍 **Carte interactive** avec marqueurs des pharmacies
- 🌙 **Filtres** : Ouvertes, De garde, De nuit
- 📱 **Interface responsive** adaptée mobile/tablette
- 📞 **Appel direct** et **itinéraire** vers les pharmacies
- 📊 **Calcul de distance** depuis votre position

### Pour les Administrateurs

- 🔐 **Authentification sécurisée** JWT
- ✏️ **CRUD complet** des pharmacies
- 📍 **Gestion géographique** avec coordonnées
- ⏰ **Gestion des horaires** et statuts
- 🎨 **Interface d'administration** intuitive

## 🛠️ Installation et Démarrage

### Prérequis

- Docker et Docker Compose installés
- Git

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd ePharmacien
```

### 2. Lancer l'application

```bash
docker-compose up --build
```

### 3. Accéder aux services

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8080/api
- **Base de données** : localhost:5432

## 📋 Utilisation

### Interface Utilisateur

1. **Accueil** : Recherchez des pharmacies par ville ou utilisez votre géolocalisation
2. **Filtres** : Utilisez les chips pour filtrer par statut (Ouvertes, De garde, De nuit)
3. **Carte** : Visualisez les pharmacies sur une carte interactive
4. **Détails** : Cliquez sur une pharmacie pour voir ses informations complètes

### Interface Admin

1. **Connexion** : Allez sur `/admin/login`
   - Utilisateur : `admin`
   - Mot de passe : `admin123`
2. **Dashboard** : Gérez toutes les pharmacies
3. **CRUD** : Ajoutez, modifiez, supprimez des pharmacies

## 🗄️ Structure de la Base de Données

### Table `pharmacies`

```sql
- id (UUID, PK)
- nom (VARCHAR)
- adresse (VARCHAR)
- ville (VARCHAR)
- latitude (DOUBLE PRECISION)
- longitude (DOUBLE PRECISION)
- location (GEOMETRY(POINT, 4326)) -- PostGIS
- ouverte (BOOLEAN)
- garde (BOOLEAN)
- nuit (BOOLEAN)
- ouverture (TIME)
- fermeture (TIME)
- telephone (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Table `admin`

```sql
- id (UUID, PK)
- username (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- created_at (TIMESTAMP)
```

## 🔌 API Endpoints

### Authentification

- `POST /api/auth/login` - Connexion admin
- `POST /api/auth/validate` - Validation token

### Pharmacies (Public)

- `GET /api/pharmacies` - Liste avec filtres
- `GET /api/pharmacies/nearby` - Pharmacies à proximité
- `GET /api/pharmacies/{id}` - Détails d'une pharmacie

### Pharmacies (Admin)

- `POST /api/pharmacies` - Créer une pharmacie
- `PUT /api/pharmacies/{id}` - Modifier une pharmacie
- `DELETE /api/pharmacies/{id}` - Supprimer une pharmacie

## 🗺️ Fonctionnalités Géospatiales

L'application utilise **PostGIS** pour des requêtes géospatiales performantes :

- **Recherche par proximité** : `ST_DWithin()` et `ST_Distance()`
- **Index spatial** : `GIST` pour optimiser les performances
- **Coordonnées automatiques** : Trigger pour mettre à jour la géométrie

## 🎨 Interface Utilisateur

### Design System

- **Couleurs** : Palette moderne avec support mode sombre
- **Composants** : Ionic + Tailwind CSS
- **Responsive** : Adapté mobile, tablette, desktop
- **Accessibilité** : Contrastes et tailles de police optimisés

### Navigation

- **Page d'accueil** : Liste et recherche
- **Carte** : Vue géographique
- **Détails** : Informations complètes
- **Admin** : Gestion des données

## 🔒 Sécurité

- **JWT** : Tokens sécurisés avec expiration
- **Spring Security** : Protection des endpoints admin
- **CORS** : Configuration pour le développement
- **Validation** : Contrôle des données côté serveur

## 🚀 Déploiement

### Production

1. Modifier les variables d'environnement
2. Configurer HTTPS
3. Optimiser les images Docker
4. Configurer un reverse proxy

### Variables d'environnement

```env
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/epharmacien
JWT_SECRET=votre-secret-jwt-securise
SPRING_PROFILES_ACTIVE=production

# Frontend
REACT_APP_API_URL=https://votre-api.com/api
```

## 📊 Données de Test

L'application inclut des données de test :

- **8 pharmacies** dans différentes villes françaises
- **Utilisateur admin** : `admin` / `admin123`
- **Coordonnées réelles** pour tester la géolocalisation

## 🔧 Développement

### Structure du Projet

```
ePharmacien/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── Dockerfile
├── frontend/               # Ionic React App
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── docker-compose.yml      # Orchestration
└── README.md
```

### Commandes Utiles

```bash
# Rebuild et restart
docker-compose down
docker-compose up --build

# Logs en temps réel
docker-compose logs -f

# Accès à la base de données
docker-compose exec postgres psql -U epharmacien -d epharmacien
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🆘 Support

Pour toute question ou problème :

1. Consultez la documentation
2. Vérifiez les logs Docker
3. Ouvrez une issue sur GitHub

---

**ePharmacien** - Trouvez facilement les pharmacies ouvertes près de chez vous ! 🏥
