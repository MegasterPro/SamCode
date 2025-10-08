import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLoaded = () => setLoading(false);

    if (document.readyState === 'complete') {
      // déjà chargé (rafraîchissement rapide) : petit délai pour UX
      setTimeout(() => setLoading(false), 2000);
      return;
    }

    window.addEventListener('load', onLoaded);

    // fallback safety timeout (ex: si load ne se déclenche pas)
    const timeout = setTimeout(() => setLoading(false), 8000);

    return () => {
      window.removeEventListener('load', onLoaded);
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Navbar />
      <Hero3D />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
