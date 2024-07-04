// app/components/SignupForm.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Corrected import for app directory
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Correct use of useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create the company document
      await setDoc(doc(db, 'companies', user.uid), {
        email,
        companyName,
        uid: user.uid,
      });

      // Create the pricing and submissions sub-collections
      await setDoc(doc(db, `companies/${user.uid}/pricing/asphalt`), { price: 0 });
      await setDoc(doc(db, `companies/${user.uid}/pricing/metal`), { price: 0 });
      await setDoc(doc(db, `companies/${user.uid}/submissions/initial`), {});

      router.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create the company document
      await setDoc(doc(db, 'companies', user.uid), {
        email: user.email,
        companyName: user.displayName,
        uid: user.uid,
      });

      // Create the pricing and submissions sub-collections
      await setDoc(doc(db, `companies/${user.uid}/pricing/asphalt`), { price: 0 });
      await setDoc(doc(db, `companies/${user.uid}/pricing/metal`), { price: 0 });
      await setDoc(doc(db, `companies/${user.uid}/submissions/initial`), {});

      router.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border rounded text-black"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full h-12 px-4 py-2 mt-4 text-white bg-black rounded hover:bg-red-600">
            <img src="/assets/Google.png" alt="Google" className="w-10 h-10 mr-2" />
            Sign up with Google
          </button>
          <Link href="/login" className="block mt-4 text-blue-500 hover:underline">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
