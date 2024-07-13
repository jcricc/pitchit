"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from './LogoutButton';
import './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md" style={{ height: '100px' }}>
      <div className="flex items-center space-x-4">
        <div className="mt-6">
          <Link href="/home">
            <Image src="/assets/PitchItLogo.png" alt="Logo" width={180} height={100} />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/home" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Home</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Pricing</Link>
          <Link href="/estimator" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Estimator</Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">AdminPortal</Link>
          <Link href="/tutorials" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Resources</Link>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-blue-500">
            <svg className="w-6 h-6 ml-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {user ? (
          <>
            <span className="text-gray-700">{user.displayName}</span>
            <LogoutButton onLogout={() => setUser(null)} />
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">Login</Link>
            <Link href="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">Sign up</Link>
          </>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/home" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Home</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Pricing</Link>
            <Link href="/estimator" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Estimator</Link>
            <Link href="/adminportal" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">AdminPortal</Link>
            <Link href="/resources" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Resources</Link>
            {user ? (
              <>
                <span className="text-gray-700">{user.displayName}</span>
                <LogoutButton onLogout={() => setUser(null)} />
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">Login</Link>
                <Link href="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
