import { motion } from 'framer-motion';
import { Briefcase, BookOpen } from 'lucide-react';
import { useTranslation } from './LanguageSwitcher';

export default function Experience() {
  const { t } = useTranslation();
  const experiences = [
    {
      type: 'work',
      icon: Briefcase,
      title: t('exp1Title'),
      organization: t('exp1Org'),
      period: t('exp1Period'),
      description: [
        t('exp1Desc1'),
        t('exp1Desc2'),
        t('exp1Desc3'),
        t('exp1Desc4'),
      ],
      color: '#0ea5e9'
    },
    {
      type: 'education',
      icon: BookOpen,
      title: t('exp2Title'),
      organization: t('exp2Org'),
      period: t('exp2Period'),
      description: [
        t('exp2Desc1'),
        t('exp2Desc2'),
        t('exp2Desc3'),
        t('exp2Desc4'),
      ],
      color: '#10b981'
    },
    {
      type: 'education',
      icon: BookOpen,
      title: t('exp3Title'),
      organization: t('exp3Org'),
      period: t('exp3Period'),
      description: [
        t('exp3Desc1'),
        t('exp3Desc2'),
        t('exp3Desc3'),
        t('exp3Desc4'),
      ],
      color: '#ef4444'
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('experienceTitle')}
        </motion.h2>

        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="experience-item"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="experience-card" style={{ borderTopColor: exp.color }}>
                <div className="experience-icon" style={{ backgroundColor: `${exp.color}15`, color: exp.color }}>
                  <exp.icon size={28} />
                </div>
                <h3>{exp.title}</h3>
                <div className="experience-meta">
                  <span className="organization">{exp.organization}</span>
                  <span className="period">{exp.period}</span>
                </div>
                <ul className="experience-description">
                  {exp.description.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
