import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTranslation } from './LanguageSwitcher';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            {t('footerMadeWith')} <Heart size={16} className="heart-icon" /> {t('footerMadeBy')}
          </p>
          <p className="footer-tagline">
            {t('desc')}
          </p>
          <p className="footer-year">
            {new Date().getFullYear()} - {t('footerRights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
