"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '../firebaseConfig';
import LogoutButton from './LogoutButton';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md" style={{ height: '100px' }}>
      <div className="flex items-center space-x-4 mt-7">
        <Link href="/home">
          <Image src="/assets/PitchItLogo.png" alt="Logo" width={180} height={100} />
        </Link>
        <nav className="flex space-x-6 mb-7">
          <Link href="/home" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Home</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Pricing</Link>
          <Link href="/estimator" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Estimator</Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Admin Portal</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <span className="text-gray-700 font-semibold text-lg">{user.displayName || user.email}</span>
            <LogoutButton onLogout={() => setUser(null)} />
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Log In</Link>
            <Link href="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">Create An Account</Link>
          </>
        )}
        <span className="text-gray-700 font-semibold text-lg">1-800-677-2491</span>
      </div>
    </header>
  );
};

export default Header;
