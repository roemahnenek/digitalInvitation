import Head from "next/head";
import "../styles/globals.css";
import { Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/ui/theme-provider';

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif"
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className={`${playfair.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
        <Analytics />
      </ThemeProvider>
    </>
  );
}

