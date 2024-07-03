"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: companyName });
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          companyName,
        });
        router.push('/admin');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/admin');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (isSignUp) {
        await updateProfile(result.user, { displayName: companyName });
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          companyName,
        });
      }
      router.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
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
          )}
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
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full h-12 px-4 py-2 mt-4 text-white bg-black rounded hover:bg-red-600">
            <img src="/assets/Google.png" alt="Google" className="w-10 h-10 mr-2" />
            Sign in with Google
          </button>
          <Link href="#" onClick={() => setIsSignUp(!isSignUp)} className="block mt-4 text-blue-500 hover:underline">
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
