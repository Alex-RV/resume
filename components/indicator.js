import { ThemeProvider, useTheme } from 'next-themes';

const { resolvedTheme, setTheme } = useTheme();

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    window.localStorage.setItem("systemMode", "dark");
  } else {
    window.localStorage.setItem("systemMode", "light");
  };