import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import {
  locationOutline,
  timeOutline,
  navigateOutline,
  mapOutline,
  medicalOutline,
} from "ionicons/icons";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      nom: "Pharmacie Centrale",
      adresse: "123 Avenue de la République",
      ville: "Paris",
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
      ouverte: true,
      garde: false,
      nuit: true,
      ouverture: "22:00",
      fermeture: "08:00",
      distance: "3.8 km",
    },
  ]);

  const filters = [
    { id: "garde", label: "De Garde", color: "warning" },
    { id: "nuit", label: "De Nuit", color: "secondary" },
    { id: "ouverte", label: "Ouvertes", color: "success" },
  ];

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filter) => pharmacy[filter]);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonIcon icon={medicalOutline} className="mr-2" />
            MonPharmacien+
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Barre de recherche */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Rechercher par ville..."
          className="mb-4"
        />

        {/* Filtres */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Filtres</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <IonChip
                key={filter.id}
                color={
                  activeFilters.includes(filter.id) ? filter.color : "medium"
                }
                onClick={() => toggleFilter(filter.id)}
                className="cursor-pointer"
              >
                {filter.label}
              </IonChip>
            ))}
          </div>
        </div>

        {/* Liste des pharmacies */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Pharmacies trouvées ({filteredPharmacies.length})
          </h3>

          <IonList>
            {filteredPharmacies.map((pharmacy) => (
              <IonCard key={pharmacy.id} className="mb-3">
                <IonCardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <IonCardTitle className="text-lg font-bold">
                        {pharmacy.nom}
                      </IonCardTitle>
                      <IonCardSubtitle className="flex items-center mt-1">
                        <IonIcon icon={locationOutline} className="mr-1" />
                        {pharmacy.adresse}, {pharmacy.ville}
                      </IonCardSubtitle>
                    </div>
                    <div className="flex flex-col gap-1">
                      {pharmacy.garde && (
                        <IonBadge color="warning">De Garde</IonBadge>
                      )}
                      {pharmacy.nuit && (
                        <IonBadge color="secondary">De Nuit</IonBadge>
                      )}
                      {pharmacy.ouverte &&
                        !pharmacy.garde &&
                        !pharmacy.nuit && (
                          <IonBadge color="success">Ouverte</IonBadge>
                        )}
                    </div>
                  </div>
                </IonCardHeader>

                <IonCardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <IonIcon icon={timeOutline} className="mr-1" />
                      <span>
                        {pharmacy.ouverture} - {pharmacy.fermeture}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {pharmacy.distance}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <IonButton
                      size="small"
                      fill="outline"
                      href={`/pharmacy/${pharmacy.id}`}
                    >
                      <IonIcon icon={navigateOutline} slot="start" />
                      Détails
                    </IonButton>
                    <IonButton size="small" fill="outline" color="secondary">
                      <IonIcon icon={mapOutline} slot="start" />
                      Itinéraire
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>

        {/* Bouton flottant pour la carte */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/map" color="primary">
            <IonIcon icon={mapOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
