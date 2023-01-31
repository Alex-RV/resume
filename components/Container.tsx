import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';


import Footer from './Footer';
import MobileMenu from './MobileMenu';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  
  //getting data about the system theme mode
  useEffect(() => {
    if(globalThis.age == 0){
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        window.localStorage.setItem("systemMode", "dark");
      } else {
        window.localStorage.setItem("systemMode", "light");
      };
      setTheme(window.localStorage.getItem("systemMode"));
      globalThis.age = 1;
    }
  }, [])

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Aleksandr Riabov – Developer, Engineer, Inventor.',
    description: `Full-stack developer, hardware engineer.`,
    image: 'https://drive.google.com/file/d/1BI0JYU5gFaVPEIXvO0DXi-Sefufm0-Ao/view?usp=share_link',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="bg-[#f9fafb] dark:bg-[#131415]">
      <Head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
        <title>{meta.title}</title>
        {/* <meta name="robots" content="follow, index" /> */}
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://aleksandr-riabov-vercel.app${router.asPath}`} />
        <link rel="canonical" href={`https://aleksandr-riabov-vercel.app${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Alex Riabov" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center  justify-between w-full   relative max-w-2xl mx-auto pt-8  sm:pb-5  text-gray-900 bg-gray-50  dark:bg-[#131415] bg-opacity-60 dark:text-gray-100">
          <div className="ml-[-0.60rem] ">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/about" text="About" />
            <NavItem href="/projects" text="Projects" />
            <NavItem href="/skills" text="Skills" />
            <NavItem href="/experience" text="Experience" />
          </div>
          {/* <label>{systemMode}</label> */}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-gray-800 dark:text-gray-200 animate-pulse duration-75"
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
        </nav>
        <hr className="flex items-center  justify-between w-full   relative mx-auto pt-1  sm:pb-1 border-1 max-w-2xl border-gray-200 mb-6 dark:border-gray-800" />
        
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center mx-8 bg-gray-50 dark:bg-[#131415] "
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}