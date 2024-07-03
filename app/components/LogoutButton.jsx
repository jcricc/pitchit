import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    await signOut(auth);
    if (onLogout) onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
