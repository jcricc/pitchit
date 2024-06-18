import React from 'react';
import Image from 'next/image';

const Header = () => (
  <header className="flex items-center justify-between p-4 bg-white shadow-md" style={{ height: '100px' }}>
    <div className="flex items-center space-x-4 mt-7">
      <Image src="/assets/PitchItLogo.png" alt="Logo" width={180} height={100} />
      <nav className="flex space-x-6 mb-7">
        <a href="#solutions" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Solutions</a>
        <a href="#pricing" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Pricing</a>
        <a href="#resources" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Resources</a>
        <a href="#company" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Company</a>
      </nav>
    </div>
    <div className="flex items-center space-x-6">
      <a href="#login" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Log In</a>
      <a href="#create-account" className="text-gray-700 hover:text-blue-500 text-lg transition duration-300">Create An Account</a>
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">START ORDER</button>
      <span className="text-gray-700 font-semibold text-lg">1-877-697-2673</span>
    </div>
  </header>
);

export default Header;
