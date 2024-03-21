import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GlobalContextProvider } from './context/cartItems';

const inter = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Get-Ceramic',
  description: 'Generated by create next app',
}

export default function RootLayout({
children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <AppRouterCacheProvider>
         <body>
         <GlobalContextProvider>
             {children}
         </GlobalContextProvider>
         </body>
      </AppRouterCacheProvider>
    </html>
  )
}
