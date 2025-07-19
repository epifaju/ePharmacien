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
  IonLoading,
  IonToast,
  IonButtons,
} from "@ionic/react";
import {
  locationOutline,
  timeOutline,
  navigateOutline,
  mapOutline,
  medicalOutline,
  refreshOutline,
} from "ionicons/icons";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      nom: "Pharmacie Centrale",
      adresse: "123 Rue de la Paix",
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
      adresse: "45 Avenue des Champs",
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
      adresse: "78 Boulevard Saint-Germain",
      ville: "Saint-Denis",
      ouverte: true,
      garde: false,
      nuit: true,
      ouverture: "22:00",
      fermeture: "08:00",
      distance: "3.8 km",
    },
    {
      id: 4,
      nom: "Pharmacie du Sud",
      adresse: "321 Rue de Rivoli",
      ville: "Paris",
      ouverte: true,
      garde: false,
      nuit: false,
      ouverture: "09:00",
      fermeture: "19:00",
      distance: "1.2 km",
    },
    {
      id: 5,
      nom: "Pharmacie de Garde Est",
      adresse: "654 Rue du Faubourg",
      ville: "Paris",
      ouverte: true,
      garde: true,
      nuit: false,
      ouverture: "24h/24",
      fermeture: "24h/24",
      distance: "4.5 km",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const filters = [
    { id: "garde", label: "De Garde", color: "warning" },
    { id: "nuit", label: "De Nuit", color: "secondary" },
    { id: "ouverte", label: "Ouvertes", color: "success" },
  ];

  // Charger les pharmacies (données statiques pour l'instant)
  const loadPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulation d'un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Pour l'instant, on utilise les données statiques
      // TODO: Remplacer par l'appel API quand le backend sera corrigé
      // const data = await pharmacyService.getAllPharmacies(filters);
      // setPharmacies(data);
    } catch (err) {
      console.error("Erreur lors du chargement des pharmacies:", err);
      setError("Erreur lors du chargement des pharmacies");
      setToastMessage("Erreur de connexion au serveur");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Charger les pharmacies au montage du composant
  useEffect(() => {
    loadPharmacies();
  }, []);

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    // Filtre par recherche
    if (
      searchText &&
      !pharmacy.nom.toLowerCase().includes(searchText.toLowerCase()) &&
      !pharmacy.ville.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }

    // Filtre par statut
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filter) => pharmacy[filter]);
  });

  const handleRefresh = () => {
    loadPharmacies();
  };

  const handleOpenDirections = (pharmacy) => {
    // Construire l'URL Google Maps avec l'itinéraire
    const address = encodeURIComponent(
      `${pharmacy.adresse}, ${pharmacy.ville}`
    );
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;

    // Ouvrir dans un nouvel onglet
    window.open(mapsUrl, "_blank");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonIcon icon={medicalOutline} className="mr-2" />
            MonPharmacien+
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleRefresh}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Barre de recherche */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Rechercher par nom ou ville..."
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

        {/* Loading */}
        <IonLoading isOpen={loading} message="Chargement des pharmacies..." />

        {/* Erreur */}
        {error && (
          <IonCard color="danger" className="mb-4">
            <IonCardContent>
              <p className="text-white">{error}</p>
              <IonButton
                fill="clear"
                color="light"
                onClick={loadPharmacies}
                className="mt-2"
              >
                Réessayer
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {/* Liste des pharmacies */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Pharmacies trouvées ({filteredPharmacies.length})
          </h3>

          {filteredPharmacies.length === 0 && !loading && !error && (
            <IonCard>
              <IonCardContent className="text-center">
                <p className="text-gray-600">Aucune pharmacie trouvée</p>
                {searchText && (
                  <p className="text-sm text-gray-500 mt-1">
                    Essayez de modifier votre recherche
                  </p>
                )}
              </IonCardContent>
            </IonCard>
          )}

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
                    {pharmacy.distance && (
                      <div className="text-sm text-gray-500">
                        {pharmacy.distance}
                      </div>
                    )}
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
                    <IonButton
                      size="small"
                      fill="outline"
                      color="secondary"
                      onClick={() => handleOpenDirections(pharmacy)}
                    >
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

        {/* Toast pour les messages */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
