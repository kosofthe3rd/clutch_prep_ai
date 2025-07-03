import React from 'react'
import {ReactNode} from "react";

const AuthLayout = ({ children } : {children: ReactNode}) => {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden dynamic-dark-bg">
            {/* Subtle Pattern Overlay */}
            <div className="fixed inset-0 -z-10 opacity-10 bg-[url('/pattern.png')] bg-repeat" />
            <div className="auth-layout">{children}</div>
        </div>
    )
}

export default AuthLayout
