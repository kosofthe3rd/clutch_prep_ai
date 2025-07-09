"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/actions/auth.action';
import { auth } from '@/firebase/client';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { toast } from 'sonner';

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        // Sign out from Firebase client
        await firebaseSignOut(auth);
        
        // Clear server-side session
        await signOut();
        
        toast.success('Signed out successfully');
        
        // Redirect to initial page
        router.push('/');
      } catch (error) {
        console.error('Error signing out:', error);
        toast.error('Error signing out. Please try again.');
        
        // Still redirect to initial page even if there's an error
        router.push('/');
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-300">Signing out...</p>
      </div>
    </div>
  );
};

export default SignOutPage; 