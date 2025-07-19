import React from 'react';

const PharmacyDetailPage: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Détail de la Pharmacie</h1>
    <div>Nom : Pharmacie Exemple</div>
    <div>Adresse : 123 rue de Paris</div>
    <div>Horaires : 8h00 - 20h00</div>
    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Itinéraire</button>
  </div>
);

export default PharmacyDetailPage; 