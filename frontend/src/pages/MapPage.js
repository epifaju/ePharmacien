import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonBadge,
} from "@ionic/react";
import {
  locationOutline,
  timeOutline,
  navigateOutline,
  homeOutline,
  medicalOutline,
} from "ionicons/icons";

const MapPage = () => {
  const [pharmacies] = useState([
    {
      id: 1,
      nom: "Pharmacie Centrale",
      adresse: "123 Avenue de la République",
      ville: "Paris",
      latitude: 48.8566,
      longitude: 2.3522,
      ouverte: true,
      garde: false,
      nuit: false,
      ouverture: "08:00",
      fermeture: "20:00",
      distance: "0.5 km",
    },
    {
      id: 2,
      nom: "Pharmacie de Garde - Montreuil",
      adresse: "45 Rue de la Paix",
      ville: "Montreuil",
      latitude: 48.8647,
      longitude: 2.4432,
      ouverte: true,
      garde: true,
      nuit: false,
      ouverture: "24h/24",
      fermeture: "24h/24",
      distance: "2.1 km",
    },
    {
      id: 3,
      nom: "Pharmacie de Nuit - Saint-Denis",
      adresse: "78 Boulevard de la Liberté",
      ville: "Saint-Denis",
      latitude: 48.9356,
      longitude: 2.3538,
      ouverte: true,
      garde: false,
      nuit: true,
      ouverture: "22:00",
      fermeture: "08:00",
      distance: "3.8 km",
    },
  ]);

  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  // Simulation d'une carte Leaflet (en attendant l'intégration réelle)
  const renderMap = () => {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
        {/* Carte de base */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <IonIcon
              icon={medicalOutline}
              className="text-4xl text-blue-600 mb-2"
            />
            <p className="text-gray-600">Carte interactive Leaflet</p>
            <p className="text-sm text-gray-500">Intégration en cours...</p>
          </div>
        </div>

        {/* Marqueurs des pharmacies */}
        {pharmacies.map((pharmacy, index) => (
          <div
            key={pharmacy.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-full ${
              index === 0
                ? "top-1/4 left-1/4"
                : index === 1
                ? "top-1/3 left-2/3"
                : "top-2/3 left-1/2"
            }`}
            onClick={() => setSelectedPharmacy(pharmacy)}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                pharmacy.garde
                  ? "bg-yellow-500"
                  : pharmacy.nuit
                  ? "bg-purple-500"
                  : "bg-green-500"
              }`}
            >
              <IonIcon icon={medicalOutline} className="text-white text-xs" />
            </div>

            {/* Badge de statut */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              {pharmacy.garde && (
                <IonBadge color="warning" className="text-xs">
                  Garde
                </IonBadge>
              )}
              {pharmacy.nuit && (
                <IonBadge color="secondary" className="text-xs">
                  Nuit
                </IonBadge>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonIcon icon={locationOutline} className="mr-2" />
            Carte des Pharmacies
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Carte interactive */}
        <div className="mb-4">{renderMap()}</div>

        {/* Légende */}
        <IonCard className="mb-4">
          <IonCardContent>
            <h3 className="font-semibold mb-2">Légende</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Ouvertes</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">De Garde</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm">De Nuit</span>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Pharmacies à proximité */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Pharmacies à proximité</h3>
          <div className="space-y-2">
            {pharmacies.map((pharmacy) => (
              <IonCard
                key={pharmacy.id}
                className={`cursor-pointer transition-colors ${
                  selectedPharmacy?.id === pharmacy.id
                    ? "border-2 border-primary"
                    : ""
                }`}
                onClick={() => setSelectedPharmacy(pharmacy)}
              >
                <IonCardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{pharmacy.nom}</h4>
                      <p className="text-sm text-gray-600">
                        {pharmacy.adresse}
                      </p>
                      <div className="flex items-center mt-1">
                        <IonIcon icon={timeOutline} className="mr-1 text-sm" />
                        <span className="text-sm">
                          {pharmacy.ouverture} - {pharmacy.fermeture}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-gray-500">
                        {pharmacy.distance}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {pharmacy.garde && (
                          <IonBadge color="warning" className="text-xs">
                            Garde
                          </IonBadge>
                        )}
                        {pharmacy.nuit && (
                          <IonBadge color="secondary" className="text-xs">
                            Nuit
                          </IonBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>

        {/* Bouton retour */}
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton href="/home" color="medium">
            <IonIcon icon={homeOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
