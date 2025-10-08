import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import { useTranslation } from './LanguageSwitcher';

const MOBILE_BREAKPOINT = 768; // px

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!isMobileMenuOpen) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#skills', label: t('skills') },
    { href: '#experience', label: t('experience') },
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') }
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -60, x: -20, rotate: -6, opacity: 0 }}
      animate={{ y: 0, x: 0, rotate: [-8, 8, -4, 0], opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <div className="nav-container">
        <motion.a
          href="#"
          className="logo"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="logo-bracket">{'<'}</span>
          {t('logo')}
          <span className="logo-bracket">{'/>'}</span>
        </motion.a>

        <div className="nav-links desktop">
          {navLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              className="nav-link"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <button
          ref={btnRef}
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: isMobileMenuOpen ? 90 : 0,
              scale: isMobileMenuOpen ? 1.05 : 1
            }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                left: 0,
                background: 'transparent',
                boxShadow: 'none',
                zIndex: 9000
              }}
            >
              <div
                ref={menuRef}
                className="mobile-menu-content"
                style={{
                  background: '#00a4f07a',
                  borderRadius: 8,
                  margin: '0.5rem',
                  padding: '0.75rem'
                }}
              >
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
