import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8082/api";

// Configuration axios avec intercepteur pour les erreurs
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Service pour les pharmacies
export const pharmacyService = {
  // Récupérer toutes les pharmacies
  getAllPharmacies: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.ville) params.append("ville", filters.ville);
    if (filters.ouverte !== undefined)
      params.append("ouverte", filters.ouverte);
    if (filters.garde !== undefined) params.append("garde", filters.garde);
    if (filters.nuit !== undefined) params.append("nuit", filters.nuit);

    const response = await api.get(`/pharmacies?${params.toString()}`);
    return response.data;
  },

  // Récupérer les pharmacies à proximité
  getNearbyPharmacies: async (lat, lon, radius = 5.0, filters = {}) => {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      radius: radius.toString(),
    });

    if (filters.ouverte !== undefined)
      params.append("ouverte", filters.ouverte);
    if (filters.garde !== undefined) params.append("garde", filters.garde);

    const response = await api.get(`/pharmacies/nearby?${params.toString()}`);
    return response.data;
  },

  // Récupérer une pharmacie par ID
  getPharmacyById: async (id) => {
    const response = await api.get(`/pharmacies/${id}`);
    return response.data;
  },

  // Créer une nouvelle pharmacie
  createPharmacy: async (pharmacyData) => {
    const response = await api.post("/pharmacies", pharmacyData);
    return response.data;
  },

  // Mettre à jour une pharmacie
  updatePharmacy: async (id, pharmacyData) => {
    const response = await api.put(`/pharmacies/${id}`, pharmacyData);
    return response.data;
  },

  // Supprimer une pharmacie
  deletePharmacy: async (id) => {
    await api.delete(`/pharmacies/${id}`);
    return true;
  },
};

// Service pour l'authentification
export const authService = {
  // Connexion admin
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  },

  // Vérifier le token
  verifyToken: async (token) => {
    const response = await api.get("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

// Service pour les notifications
export const notificationService = {
  // Envoyer une notification
  sendNotification: async (notificationData) => {
    const response = await api.post("/notifications/send", notificationData);
    return response.data;
  },
};

export default api;
