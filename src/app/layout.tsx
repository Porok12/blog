import React from "react";
import {Inter} from 'next/font/google'
import Providers from "@/app/providers";
import Header from "@/app/components/Header";
import './globals.css'

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Dev Blog',
    description: 'Generated by create next app',
}

interface Props {
    children: React.ReactNode
}

const RootLayout = ({children}: Props) => {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white dark:bg-slate-800 text-black dark:text-white`}>
                    <Providers>
                        <Header/>
                        <div className="container mx-auto">
                            {children}
                        </div>
                    </Providers>
            </body>
        </html>
    )
}

export default RootLayout;
