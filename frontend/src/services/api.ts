import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const fetchPharmacies = (ville?: string, ouverte?: boolean) =>
  axios.get(`${API_BASE_URL}/pharmacies`, { params: { ville, ouverte } });

export const fetchNearbyPharmacies = (lat: number, lon: number) =>
  axios.get(`${API_BASE_URL}/pharmacies/nearby`, { params: { lat, lon } });

export const adminLogin = (username: string, password: string) =>
  axios.post(`${API_BASE_URL}/auth/login`, { username, password }); 