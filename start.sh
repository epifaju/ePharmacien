#!/bin/bash

echo "🏥 ePharmacien - Démarrage de l'application"
echo "=========================================="

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

echo "✅ Docker et Docker Compose sont installés"

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose down

# Construire et démarrer les conteneurs
echo "🔨 Construction et démarrage des conteneurs..."
docker-compose up --build -d

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérifier le statut des conteneurs
echo "📊 Statut des conteneurs :"
docker-compose ps

echo ""
echo "🎉 Application démarrée avec succès !"
echo ""
echo "📱 Frontend (Application) : http://localhost:3000"
echo "🔧 Backend (API) : http://localhost:8080/api"
echo "🗄️  Base de données : localhost:5432"
echo ""
echo "🔐 Identifiants Admin :"
echo "   Utilisateur : admin"
echo "   Mot de passe : admin123"
echo ""
echo "📋 Commandes utiles :"
echo "   - Voir les logs : docker-compose logs -f"
echo "   - Arrêter l'app : docker-compose down"
echo "   - Redémarrer : docker-compose restart"
echo ""
echo "🚀 Bonne utilisation !" 