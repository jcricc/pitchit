import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
            <li><Link href="/who-we-are" className="text-gray-400">Who We Are</Link></li>
            <li><Link href="/vision-mission" className="text-gray-400">Vision & Mission</Link></li>
            <li><Link href="/core-values" className="text-gray-400">Core Values</Link></li>
            <li><Link href="/quality-policy" className="text-gray-400">Quality Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Company</h4>
          <ul className="mt-2 space-y-2">
            <li><Link href="/privacy-policy" className="text-gray-400">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use" className="text-gray-400">Terms Of Use</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Resources</h4>
          <ul className="mt-2 space-y-2">
            <li><Link href="/tutorials" className="text-gray-400">Tutorials</Link></li>
            <li><Link href="/contact-us" className="text-gray-400">Contact Us</Link></li>
            <li><Link href="/faq" className="text-gray-400">FAQ</Link></li>
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
