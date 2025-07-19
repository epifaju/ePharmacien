import React from 'react';

const HomePage: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Recherche de Pharmacies</h1>
    <input type="text" placeholder="Rechercher par ville..." className="border p-2 rounded mb-2 w-full" />
    <div className="flex gap-2 mb-2">
      <button className="bg-blue-500 text-white px-2 py-1 rounded">Garde</button>
      <button className="bg-blue-500 text-white px-2 py-1 rounded">Nuit</button>
      <button className="bg-blue-500 text-white px-2 py-1 rounded">Ouverte</button>
    </div>
    <ul>
      <li>Pharmacie 1</li>
      <li>Pharmacie 2</li>
    </ul>
  </div>
);

export default HomePage; 