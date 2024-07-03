import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './hooks/useAuth';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'PitchIt',
  description: 'Calculate roof area based on pitch and area',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
