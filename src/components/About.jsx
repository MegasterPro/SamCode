import { motion } from 'framer-motion';
import { User, GraduationCap, Target } from 'lucide-react';
import { useTranslation } from './LanguageSwitcher';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2 className="section-title" {...fadeInUp}>
          <Translate k="aboutMeTitle" />
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-icon">
              <User size={32} />
            </div>
            <h3><Translate k="whoAmI" /></h3>
            <p>
              <Translate k="whoAmIDesc" />
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-icon">
              <GraduationCap size={32} />
            </div>
            <h3><Translate k="educationTitle" /></h3>
            <p>
              <Translate k="educationDesc" />
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-icon">
              <Target size={32} />
            </div>
            <h3><Translate k="myGoalTitle" /></h3>
            <p>
              <Translate k="myGoalDesc" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Translate({ k }) {
  const { t } = useTranslation();
  const text = t(k);
  // Gérer le HTML simple comme <strong>
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}
