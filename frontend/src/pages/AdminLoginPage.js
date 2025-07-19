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
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonBackButton,
  IonButtons,
  IonLoading,
  IonToast,
} from "@ionic/react";
import {
  personOutline,
  lockClosedOutline,
  logInOutline,
  shieldCheckmarkOutline,
  medicalOutline,
} from "ionicons/icons";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 5) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 5 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Pour la démo, on accepte admin/admin
      if (formData.username === "admin" && formData.password === "admin") {
        setToastMessage("Connexion réussie ! Redirection...");
        setShowToast(true);
        // Redirection vers le dashboard après 2 secondes
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 2000);
      } else {
        setToastMessage("Identifiants incorrects");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Erreur de connexion");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>
            <IonIcon icon={shieldCheckmarkOutline} className="mr-2" />
            Administration
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-full py-8">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <IonIcon icon={medicalOutline} className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">MonPharmacien+</h1>
            <p className="text-gray-600 mt-2">Espace Administrateur</p>
          </div>

          {/* Formulaire de connexion */}
          <IonCard className="w-full max-w-md">
            <IonCardHeader>
              <IonCardTitle className="text-center flex items-center justify-center">
                <IonIcon icon={logInOutline} className="mr-2" />
                Connexion
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleSubmit}>
                {/* Nom d'utilisateur */}
                <IonItem
                  className={`mb-4 ${errors.username ? "ion-invalid" : ""}`}
                >
                  <IonLabel position="stacked">
                    <IonIcon icon={personOutline} className="mr-2" />
                    Nom d'utilisateur
                  </IonLabel>
                  <IonInput
                    type="text"
                    value={formData.username}
                    onIonInput={(e) =>
                      handleInputChange("username", e.detail.value)
                    }
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                  />
                  {errors.username && (
                    <IonText color="danger" className="text-sm mt-1">
                      {errors.username}
                    </IonText>
                  )}
                </IonItem>

                {/* Mot de passe */}
                <IonItem
                  className={`mb-6 ${errors.password ? "ion-invalid" : ""}`}
                >
                  <IonLabel position="stacked">
                    <IonIcon icon={lockClosedOutline} className="mr-2" />
                    Mot de passe
                  </IonLabel>
                  <IonInput
                    type="password"
                    value={formData.password}
                    onIonInput={(e) =>
                      handleInputChange("password", e.detail.value)
                    }
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  {errors.password && (
                    <IonText color="danger" className="text-sm mt-1">
                      {errors.password}
                    </IonText>
                  )}
                </IonItem>

                {/* Bouton de connexion */}
                <IonButton
                  type="submit"
                  expand="block"
                  color="primary"
                  disabled={isLoading}
                  className="mb-4"
                >
                  {isLoading ? (
                    <>
                      <IonLoading isOpen={isLoading} message="Connexion..." />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <IonIcon icon={logInOutline} slot="start" />
                      Se connecter
                    </>
                  )}
                </IonButton>
              </form>

              {/* Informations de démo */}
              <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Démo :</strong> Utilisez ces identifiants
                </p>
                <p className="text-xs text-gray-500">
                  Utilisateur: <code>admin</code>
                  <br />
                  Mot de passe: <code>admin</code>
                </p>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Informations de sécurité */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              <IonIcon icon={shieldCheckmarkOutline} className="mr-1" />
              Accès sécurisé - Connexion chiffrée
            </p>
          </div>
        </div>

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

export default AdminLoginPage;
