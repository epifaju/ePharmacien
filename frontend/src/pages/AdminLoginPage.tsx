import React from 'react';

const AdminLoginPage: React.FC = () => (
  <div className="p-4 max-w-sm mx-auto">
    <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>
    <form className="flex flex-col gap-2">
      <input type="text" placeholder="Nom d'utilisateur" className="border p-2 rounded" />
      <input type="password" placeholder="Mot de passe" className="border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
    </form>
  </div>
);

export default AdminLoginPage; 