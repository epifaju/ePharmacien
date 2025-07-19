import React, { useState } from "react";
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
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonFab,
  IonFabButton,
  IonModal,
  IonInput,
  IonTextarea,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  addOutline,
  settingsOutline,
  notificationsOutline,
  medicalOutline,
  locationOutline,
  timeOutline,
  trashOutline,
  createOutline,
  statsChartOutline,
  peopleOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";

const AdminDashboardPage = () => {
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
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newPharmacy, setNewPharmacy] = useState({
    nom: "",
    adresse: "",
    ville: "",
    ouverture: "08:00",
    fermeture: "20:00",
    ouverte: true,
    garde: false,
    nuit: false,
  });

  const [notification, setNotification] = useState({
    titre: "",
    message: "",
    type: "info",
  });

  const stats = {
    total: pharmacies.length,
    ouvertes: pharmacies.filter((p) => p.ouverte).length,
    garde: pharmacies.filter((p) => p.garde).length,
    nuit: pharmacies.filter((p) => p.nuit).length,
  };

  const handleAddPharmacy = () => {
    if (newPharmacy.nom && newPharmacy.adresse && newPharmacy.ville) {
      const pharmacy = {
        ...newPharmacy,
        id: Date.now(),
      };
      setPharmacies((prev) => [...prev, pharmacy]);
      setNewPharmacy({
        nom: "",
        adresse: "",
        ville: "",
        ouverture: "08:00",
        fermeture: "20:00",
        ouverte: true,
        garde: false,
        nuit: false,
      });
      setShowAddModal(false);
      setToastMessage("Pharmacie ajoutée avec succès");
      setShowToast(true);
    }
  };

  const handleDeletePharmacy = (id) => {
    setPharmacies((prev) => prev.filter((p) => p.id !== id));
    setToastMessage("Pharmacie supprimée");
    setShowToast(true);
  };

  const handleSendNotification = () => {
    if (notification.titre && notification.message) {
      setToastMessage("Notification envoyée aux utilisateurs");
      setShowToast(true);
      setNotification({ titre: "", message: "", type: "info" });
      setShowNotificationModal(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/login" />
          </IonButtons>
          <IonTitle>
            <IonIcon icon={shieldCheckmarkOutline} className="mr-2" />
            Dashboard Admin
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotificationModal(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <IonCard>
            <IonCardContent className="text-center">
              <IonIcon
                icon={medicalOutline}
                className="text-2xl text-primary mb-2"
              />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Pharmacies</div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent className="text-center">
              <IonIcon
                icon={statsChartOutline}
                className="text-2xl text-success mb-2"
              />
              <div className="text-2xl font-bold">{stats.ouvertes}</div>
              <div className="text-sm text-gray-600">Ouvertes</div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent className="text-center">
              <IonIcon
                icon={peopleOutline}
                className="text-2xl text-warning mb-2"
              />
              <div className="text-2xl font-bold">{stats.garde}</div>
              <div className="text-sm text-gray-600">De Garde</div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent className="text-center">
              <IonIcon
                icon={timeOutline}
                className="text-2xl text-secondary mb-2"
              />
              <div className="text-2xl font-bold">{stats.nuit}</div>
              <div className="text-sm text-gray-600">De Nuit</div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Liste des pharmacies */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="flex justify-between items-center">
              <span>Gestion des Pharmacies</span>
              <IonButton
                size="small"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                <IonIcon icon={addOutline} slot="start" />
                Ajouter
              </IonButton>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              {pharmacies.map((pharmacy) => (
                <IonItem key={pharmacy.id}>
                  <div className="flex-1">
                    <IonLabel>
                      <h2 className="font-semibold">{pharmacy.nom}</h2>
                      <p className="text-sm text-gray-600">
                        <IonIcon icon={locationOutline} className="mr-1" />
                        {pharmacy.adresse}, {pharmacy.ville}
                      </p>
                      <p className="text-sm text-gray-600">
                        <IonIcon icon={timeOutline} className="mr-1" />
                        {pharmacy.ouverture} - {pharmacy.fermeture}
                      </p>
                    </IonLabel>
                  </div>

                  <div className="flex items-center gap-2">
                    {pharmacy.garde && (
                      <IonBadge color="warning">Garde</IonBadge>
                    )}
                    {pharmacy.nuit && (
                      <IonBadge color="secondary">Nuit</IonBadge>
                    )}
                    {pharmacy.ouverte && !pharmacy.garde && !pharmacy.nuit && (
                      <IonBadge color="success">Ouverte</IonBadge>
                    )}

                    <IonButton size="small" fill="clear" color="primary">
                      <IonIcon icon={createOutline} />
                    </IonButton>

                    <IonButton
                      size="small"
                      fill="clear"
                      color="danger"
                      onClick={() => handleDeletePharmacy(pharmacy.id)}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Bouton flottant pour ajouter */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" onClick={() => setShowAddModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal d'ajout de pharmacie */}
        <IonModal
          isOpen={showAddModal}
          onDidDismiss={() => setShowAddModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ajouter une Pharmacie</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowAddModal(false)}>
                  Fermer
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Nom de la pharmacie</IonLabel>
              <IonInput
                value={newPharmacy.nom}
                onIonInput={(e) =>
                  setNewPharmacy((prev) => ({ ...prev, nom: e.detail.value }))
                }
                placeholder="Nom de la pharmacie"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Adresse</IonLabel>
              <IonInput
                value={newPharmacy.adresse}
                onIonInput={(e) =>
                  setNewPharmacy((prev) => ({
                    ...prev,
                    adresse: e.detail.value,
                  }))
                }
                placeholder="Adresse complète"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Ville</IonLabel>
              <IonInput
                value={newPharmacy.ville}
                onIonInput={(e) =>
                  setNewPharmacy((prev) => ({ ...prev, ville: e.detail.value }))
                }
                placeholder="Ville"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Horaires</IonLabel>
              <IonInput
                value={newPharmacy.ouverture}
                onIonInput={(e) =>
                  setNewPharmacy((prev) => ({
                    ...prev,
                    ouverture: e.detail.value,
                  }))
                }
                placeholder="Heure d'ouverture"
              />
              <IonInput
                value={newPharmacy.fermeture}
                onIonInput={(e) =>
                  setNewPharmacy((prev) => ({
                    ...prev,
                    fermeture: e.detail.value,
                  }))
                }
                placeholder="Heure de fermeture"
              />
            </IonItem>

            <IonItem>
              <IonLabel>Statuts</IonLabel>
              <IonToggle
                checked={newPharmacy.ouverte}
                onIonChange={(e) =>
                  setNewPharmacy((prev) => ({
                    ...prev,
                    ouverte: e.detail.checked,
                  }))
                }
              />
              <IonLabel>Ouverte</IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>De Garde</IonLabel>
              <IonToggle
                checked={newPharmacy.garde}
                onIonChange={(e) =>
                  setNewPharmacy((prev) => ({
                    ...prev,
                    garde: e.detail.checked,
                  }))
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>De Nuit</IonLabel>
              <IonToggle
                checked={newPharmacy.nuit}
                onIonChange={(e) =>
                  setNewPharmacy((prev) => ({
                    ...prev,
                    nuit: e.detail.checked,
                  }))
                }
              />
            </IonItem>

            <div className="ion-padding">
              <IonButton expand="block" onClick={handleAddPharmacy}>
                Ajouter la Pharmacie
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal de notification */}
        <IonModal
          isOpen={showNotificationModal}
          onDidDismiss={() => setShowNotificationModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Envoyer une Notification</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowNotificationModal(false)}>
                  Fermer
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Titre</IonLabel>
              <IonInput
                value={notification.titre}
                onIonInput={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    titre: e.detail.value,
                  }))
                }
                placeholder="Titre de la notification"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Message</IonLabel>
              <IonTextarea
                value={notification.message}
                onIonInput={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    message: e.detail.value,
                  }))
                }
                placeholder="Message de la notification"
                rows={4}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Type</IonLabel>
              <IonSelect
                value={notification.type}
                onIonChange={(e) =>
                  setNotification((prev) => ({ ...prev, type: e.detail.value }))
                }
              >
                <IonSelectOption value="info">Information</IonSelectOption>
                <IonSelectOption value="warning">Avertissement</IonSelectOption>
                <IonSelectOption value="success">Succès</IonSelectOption>
                <IonSelectOption value="danger">Urgence</IonSelectOption>
              </IonSelect>
            </IonItem>

            <div className="ion-padding">
              <IonButton expand="block" onClick={handleSendNotification}>
                Envoyer la Notification
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Toast */}
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

export default AdminDashboardPage;
