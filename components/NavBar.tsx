import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';

const NavBar = async () => {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={70} height={50} />
        <h2 className="text-primary-100">ClutchPrep-AI</h2>
      </Link>
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <Button asChild variant="secondary">
              <Link href="/interview">Start Interview</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/history">History</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/profile">
                {user?.name ? (
                  <span className="font-semibold">{user.name}</span>
                ) : (
                  <Image src="/user-avatar.png" alt="Profile" width={32} height={32} className="rounded-full" />
                )}
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link href="/sign-out">Sign Out</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/help">Help</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/help">Help</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 