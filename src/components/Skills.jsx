import { motion } from 'framer-motion';
import { useTranslation } from './LanguageSwitcher';

export default function Skills() {
  const { t } = useTranslation();
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['JavaScript', 'TypeScript', 'React', 'Three.js', 'Flutter'],
      color: '#0ea5e9'
    },
    {
      title: 'Backend',
      skills: ['PHP', 'Laravel', 'Python', 'Django', 'Node.js'],
      color: '#10b981'
    },
    {
      title: 'Data Science & ML',
      skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
      color: '#f59e0b'
    },
    {
      title: 'Langages Système',
      skills: ['C', 'C#', 'C++'],
      color: '#8b5cf6'
    },
    {
      title: 'Cybersécurité',
      skills: ['Pentest', 'HackTheBox', 'Network Security', 'Vulnerability Assessment'],
      color: '#ef4444'
    },
    {
      title: 'Outils & Autres',
      skills: ['Git', 'Docker', 'Linux', 'SQL', 'NoSQL'],
      color: '#06b6d4'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="section section-dark">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('skillsTitle')}
        </motion.h2>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              className="skill-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="skill-header" style={{ borderLeftColor: category.color }}>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skillIdx}
                    className="skill-tag"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
