import React from 'react'
import {ReactNode} from "react";
import NavBar from '@/components/NavBar';

const RootLayout = ({ children } : { children: ReactNode}) => {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden dynamic-dark-bg">
            {/* Subtle Pattern Overlay */}
            <div className="fixed inset-0 -z-10 opacity-10 bg-[url('/pattern.png')] bg-repeat" />
            <NavBar />
            {/* Dark Content Container */}
            <main className="max-w-5xl mx-auto w-full px-4 py-8 mt-8">
                {children}
            </main>
        </div>
    )
}
export default RootLayout
