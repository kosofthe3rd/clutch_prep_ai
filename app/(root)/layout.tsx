import React from 'react'
import {ReactNode} from "react";
import Image from "next/image";
import Link from 'next/link';
import {pages} from "next/dist/build/templates/app-page";


const RootLayout = ({ children } : { children: ReactNode}) => {
    return (
        <div className="root-layout">
            <nav>
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={70} height={50} />
                    <h2 className="text-primary-100">ClutchPrep-AI</h2>
                </Link>
            </nav>

            {children}
        </div>
    )
}
export default RootLayout
