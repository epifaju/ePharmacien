import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonBackButton,
  IonButtons,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  locationOutline,
  timeOutline,
  navigateOutline,
  callOutline,
  mailOutline,
  globeOutline,
  arrowBackOutline,
  medicalOutline,
} from "ionicons/icons";

const PharmacyDetailPage = () => {
  const [pharmacy, setPharmacy] = useState({
    id: 1,
    nom: "Pharmacie Centrale",
    adresse: "123 Avenue de la République",
    ville: "Paris",
    codePostal: "75001",
    telephone: "01 42 60 12 34",
    email: "contact@pharmacie-centrale.fr",
    website: "https://pharmacie-centrale.fr",
    ouverte: true,
    garde: false,
    nuit: false,
    ouverture: "08:00",
    fermeture: "20:00",
    distance: "0.5 km",
    latitude: 48.8566,
    longitude: 2.3522,
    services: [
      "Livraison à domicile",
      "Conseil pharmaceutique",
      "Vaccination",
      "Test COVID-19",
      "Ordonnance électronique",
    ],
    specialites: [
      "Médicaments génériques",
      "Homéopathie",
      "Parapharmacie",
      "Cosmétiques",
    ],
  });

  const getStatusColor = () => {
    if (pharmacy.garde) return "warning";
    if (pharmacy.nuit) return "secondary";
    if (pharmacy.ouverte) return "success";
    return "danger";
  };

  const getStatusText = () => {
    if (pharmacy.garde) return "De Garde";
    if (pharmacy.nuit) return "De Nuit";
    if (pharmacy.ouverte) return "Ouverte";
    return "Fermée";
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
    window.open(url, "_blank");
  };

  const callPharmacy = () => {
    window.open(`tel:${pharmacy.telephone}`, "_self");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>
            <IonIcon icon={medicalOutline} className="mr-2" />
            Détails Pharmacie
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* En-tête avec statut */}
        <IonCard className="mb-4">
          <IonCardHeader>
            <div className="flex justify-between items-start">
              <div>
                <IonCardTitle className="text-xl font-bold">
                  {pharmacy.nom}
                </IonCardTitle>
                <div className="flex items-center mt-2">
                  <IonIcon icon={locationOutline} className="mr-2" />
                  <span>
                    {pharmacy.adresse}, {pharmacy.codePostal} {pharmacy.ville}
                  </span>
                </div>
              </div>
              <IonBadge color={getStatusColor()} className="text-sm">
                {getStatusText()}
              </IonBadge>
            </div>
          </IonCardHeader>
        </IonCard>

        {/* Horaires */}
        <IonCard className="mb-4">
          <IonCardHeader>
            <IonCardTitle className="flex items-center">
              <IonIcon icon={timeOutline} className="mr-2" />
              Horaires d'ouverture
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {pharmacy.ouverture} - {pharmacy.fermeture}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {pharmacy.garde || pharmacy.nuit
                  ? "Ouvert 24h/24"
                  : "Lundi au Samedi"}
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Contact */}
        <IonCard className="mb-4">
          <IonCardHeader>
            <IonCardTitle>Contact</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem button onClick={callPharmacy}>
                <IonIcon icon={callOutline} slot="start" />
                <IonLabel>{pharmacy.telephone}</IonLabel>
                <IonNote slot="end">Appeler</IonNote>
              </IonItem>
              <IonItem button>
                <IonIcon icon={mailOutline} slot="start" />
                <IonLabel>{pharmacy.email}</IonLabel>
                <IonNote slot="end">Email</IonNote>
              </IonItem>
              <IonItem button>
                <IonIcon icon={globeOutline} slot="start" />
                <IonLabel>{pharmacy.website}</IonLabel>
                <IonNote slot="end">Site web</IonNote>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Services */}
        <IonCard className="mb-4">
          <IonCardHeader>
            <IonCardTitle>Services proposés</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="flex flex-wrap gap-2">
              {pharmacy.services.map((service, index) => (
                <IonBadge key={index} color="primary" className="text-xs">
                  {service}
                </IonBadge>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Spécialités */}
        <IonCard className="mb-4">
          <IonCardHeader>
            <IonCardTitle>Spécialités</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="flex flex-wrap gap-2">
              {pharmacy.specialites.map((specialite, index) => (
                <IonBadge key={index} color="secondary" className="text-xs">
                  {specialite}
                </IonBadge>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Boutons d'action */}
        <div className="flex gap-3 mb-4">
          <IonButton expand="block" color="primary" onClick={openMaps}>
            <IonIcon icon={navigateOutline} slot="start" />
            Itinéraire
          </IonButton>
          <IonButton expand="block" color="secondary" onClick={callPharmacy}>
            <IonIcon icon={callOutline} slot="start" />
            Appeler
          </IonButton>
        </div>

        {/* Distance */}
        <IonCard>
          <IonCardContent>
            <div className="text-center">
              <div className="text-sm text-gray-600">
                Distance depuis votre position
              </div>
              <div className="text-xl font-bold text-primary">
                {pharmacy.distance}
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PharmacyDetailPage;
