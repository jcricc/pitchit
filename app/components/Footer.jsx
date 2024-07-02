import React from 'react';
import Image from 'next/image';

const Footer = () => (
  <footer className="footer-section py-20 bg-gray-800 text-white">
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div>
          <Image src="/assets/PitchItLogoCopy.png" alt="Logo" width={255} height={164} />
          <p className="mb-24 text-gray-400">Saving Contractors Time & Money</p>
        </div>
        <div>
          <h4 className="text-lg font-bold">About Us</h4>
          <ul className="mt-2 space-y-2">
            <li><a href="#who-we-are" className="text-gray-400">Who We Are</a></li>
            <li><a href="#vision-mission" className="text-gray-400">Vision & Mission</a></li>
            <li><a href="#core-values" className="text-gray-400">Core Values</a></li>
            <li><a href="#quality-policy" className="text-gray-400">Quality Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Company</h4>
          <ul className="mt-2 space-y-2">
            <li><a href="#blog" className="text-gray-400">Blog</a></li>
            <li><a href="#partners" className="text-gray-400">Partners</a></li>
            <li><a href="#careers" className="text-gray-400">Careers</a></li>
            <li><a href="#privacy-policy" className="text-gray-400">Privacy Policy</a></li>
            <li><a href="#terms-of-use" className="text-gray-400">Terms Of Use</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Resources</h4>
          <ul className="mt-2 space-y-2">
            <li><a href="#tutorials" className="text-gray-400">Tutorials</a></li>
            <li><a href="#contact-us" className="text-gray-400">Contact Us</a></li>
            <li><a href="#faq" className="text-gray-400">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Follow Us</h4>
          <p className="mt-4 text-gray-400">1-800-677-2491</p>
          <p className="text-gray-400">370 17th Street 50th Floor, Denver, CO 80202</p>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400">
        &copy; 2024 PitchIt Technologies. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
