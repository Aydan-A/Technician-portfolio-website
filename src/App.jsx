import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import JournalPage from './pages/JournalPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

const themes = ['dark', 'light'];

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const savedTheme = window.localStorage.getItem('theme');
    return themes.includes(savedTheme) ? savedTheme : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  function handleThemeChange(nextTheme) {
    if (themes.includes(nextTheme)) {
      setTheme(nextTheme);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout onThemeChange={handleThemeChange} theme={theme} />}>
          <Route element={<HomePage />} index />
          <Route element={<AboutPage />} path="about" />
          <Route element={<ProjectsPage />} path="projects" />
          <Route element={<JournalPage />} path="journal" />
          <Route element={<ContactPage />} path="contact" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
