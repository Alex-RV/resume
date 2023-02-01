import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Inter } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css"



const interVariable = Inter();
var age: number;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  useEffect(() => {
    if(globalThis.age == ""|| null || undefined || "undefined"){
      globalThis.age = 0
    };}, [])
  return(
    <>
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
    </>
  )
}
