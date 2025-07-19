import React from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Routes, Redirect } from "react-router-dom";
import {
  homeOutline,
  mapOutline,
  searchOutline,
  personOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Pages
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import PharmacyDetailPage from "./pages/PharmacyDetailPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/map" exact>
            <MapPage />
          </Route>
          <Route path="/pharmacy/:id" exact>
            <PharmacyDetailPage />
          </Route>
          <Route path="/admin/login" exact>
            <AdminLoginPage />
          </Route>
          <Route path="/admin/dashboard" exact>
            <AdminDashboardPage />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/home">
            <IonIcon icon={searchOutline} />
            <IonLabel>Recherche</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon icon={mapOutline} />
            <IonLabel>Carte</IonLabel>
          </IonTabButton>
          <IonTabButton tab="admin" href="/admin/login">
            <IonIcon icon={personOutline} />
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
