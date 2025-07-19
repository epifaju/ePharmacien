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
  IonLoading,
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
  refreshOutline,
} from "ionicons/icons";

const AdminDashboardPage = () => {
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
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("success");

  const [newPharmacy, setNewPharmacy] = useState({
    nom: "",
    adresse: "",
    ville: "",
    ouverture: "08:00",
    fermeture: "20:00",
    ouverte: true,
    garde: false,
    nuit: false,
    latitude: 48.8566,
    longitude: 2.3522,
  });

  const [notification, setNotification] = useState({
    titre: "",
    message: "",
    type: "info",
  });

  // Charger les pharmacies (données statiques pour l'instant)
  const loadPharmacies = async () => {
    try {
      setLoading(true);
      // Simulation d'un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Pour l'instant, on utilise les données statiques
      // TODO: Remplacer par l'appel API quand le backend sera corrigé
    } catch (error) {
      console.error("Erreur lors du chargement des pharmacies:", error);
      setToastMessage("Erreur lors du chargement des pharmacies");
      setToastColor("danger");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Charger les pharmacies au montage du composant
  useEffect(() => {
    loadPharmacies();
  }, []);

  const stats = {
    total: pharmacies.length,
    ouvertes: pharmacies.filter((p) => p.ouverte).length,
    garde: pharmacies.filter((p) => p.garde).length,
    nuit: pharmacies.filter((p) => p.nuit).length,
  };

  const handleAddPharmacy = async () => {
    if (newPharmacy.nom && newPharmacy.adresse && newPharmacy.ville) {
      try {
        // Créer une nouvelle pharmacie avec un ID unique
        const createdPharmacy = {
          ...newPharmacy,
          id: Date.now(), // ID unique basé sur le timestamp
        };

        // Ajouter à la liste locale
        setPharmacies((prev) => [...prev, createdPharmacy]);

        // Réinitialiser le formulaire
        setNewPharmacy({
          nom: "",
          adresse: "",
          ville: "",
          ouverture: "08:00",
          fermeture: "20:00",
          ouverte: true,
          garde: false,
          nuit: false,
          latitude: 48.8566,
          longitude: 2.3522,
        });

        setShowAddModal(false);
        setToastMessage("Pharmacie ajoutée avec succès");
        setToastColor("success");
        setShowToast(true);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la pharmacie:", error);
        setToastMessage("Erreur lors de l'ajout de la pharmacie");
        setToastColor("danger");
        setShowToast(true);
      }
    } else {
      setToastMessage("Veuillez remplir tous les champs obligatoires");
      setToastColor("warning");
      setShowToast(true);
    }
  };

  const handleDeletePharmacy = async (id) => {
    try {
      // Supprimer de la liste locale
      setPharmacies((prev) => prev.filter((p) => p.id !== id));
      setToastMessage("Pharmacie supprimée avec succès");
      setToastColor("success");
      setShowToast(true);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setToastMessage("Erreur lors de la suppression");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  const handleSendNotification = async () => {
    if (notification.titre && notification.message) {
      try {
        // Simulation d'envoi de notification
        console.log("Notification envoyée:", notification);
        setToastMessage("Notification envoyée aux utilisateurs");
        setToastColor("success");
        setShowToast(true);
        setNotification({ titre: "", message: "", type: "info" });
        setShowNotificationModal(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi de la notification:", error);
        setToastMessage("Erreur lors de l'envoi de la notification");
        setToastColor("danger");
        setShowToast(true);
      }
    } else {
      setToastMessage("Veuillez remplir le titre et le message");
      setToastColor("warning");
      setShowToast(true);
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
            <IonButton onClick={loadPharmacies}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Loading */}
        <IonLoading isOpen={loading} message="Chargement..." />

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
            {pharmacies.length === 0 && !loading ? (
              <div className="text-center py-8">
                <IonIcon
                  icon={medicalOutline}
                  className="text-4xl text-gray-400 mb-4"
                />
                <p className="text-gray-600">Aucune pharmacie enregistrée</p>
                <IonButton
                  color="primary"
                  className="mt-4"
                  onClick={() => setShowAddModal(true)}
                >
                  <IonIcon icon={addOutline} slot="start" />
                  Ajouter la première pharmacie
                </IonButton>
              </div>
            ) : (
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
                      {pharmacy.ouverte &&
                        !pharmacy.garde &&
                        !pharmacy.nuit && (
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
            )}
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
              <IonLabel position="stacked">Nom de la pharmacie *</IonLabel>
              <IonInput
                value={newPharmacy.nom}
                onIonInput={(e) =>
                  setNewPharmacy((prev) => ({ ...prev, nom: e.detail.value }))
                }
                placeholder="Nom de la pharmacie"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Adresse *</IonLabel>
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
              <IonLabel position="stacked">Ville *</IonLabel>
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
              <IonLabel position="stacked">Titre *</IonLabel>
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
              <IonLabel position="stacked">Message *</IonLabel>
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
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboardPage;
