export interface Pharmacy {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  latitude: number;
  longitude: number;
  ouverte: boolean;
  garde: boolean;
  nuit: boolean;
  ouverture: string;
  fermeture: string;
}

export interface Admin {
  id: string;
  username: string;
  password_hash: string;
} 