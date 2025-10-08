import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import { useTranslation } from './LanguageSwitcher';

export default function Projects() {
  const { t } = useTranslation();
  const featuredProject = {
    title: t('featuredProjectTitle'),
    description: t('featuredProjectDesc'),
    technologies: ['Python', 'Machine Learning', 'NLP', 'Deep Learning'],
    status: t('featuredProjectStatus'),
    isFeatured: true
  };

  const otherProjects = [
    {
      title: t('p1Title'),
      description: t('p1Desc'),
      technologies: ['React', 'Three.js', 'Framer Motion'],
      github: 'https://github.com/MegasterPro/SamCode'
    },
    {
      title: t('p2Title'),
      description: t('p2Desc'),
      technologies: ['React', 'Laravel', 'MySQL'],
      github: 'https://github.com/MegasterPro/ona_akilli'
    },
    {
      title: t('p3Title'),
      description: t('p3Desc'),
      technologies: ['Python', 'Bash', 'Network Security'],
      github: '#'
    },
    {
      title: t('p4Title'),
      description: t('p4Desc'),
      technologies: ['React', 'D3.js', 'Django'],
      github: 'https://github.com/MegasterPro/Unity-Game-Samba-'
    },
    {
      title: t('p5Title'),
      description: t('p5Desc'),
      technologies: ['TypeScript', 'Firebase'],
      github: 'https://github.com/MegasterPro/NEWTON'
    }
  ];

  return (
    <section id="projects" className="section section-dark">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('projectsTitle')}
        </motion.h2>

        <motion.div
          className="featured-project"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="featured-badge">
            <Sparkles size={20} />
            <span>{t('featuredProjectBadge')}</span>
          </div>
          <h3>{featuredProject.title}</h3>
          <p className="project-description">{featuredProject.description}</p>
          <div className="project-tech">
            {featuredProject.technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge featured">{tech}</span>
            ))}
          </div>
          <div className="project-status">
            <span className="status-indicator"></span>
            {featuredProject.status}
          </div>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {otherProjects.map((project, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, techIdx) => (
                  <span key={techIdx} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link" aria-label="GitHub">
                  <Github size={20} />
                </a>
                {project.demo && (
                  <a href={project.demo} className="project-link" aria-label="Demo">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="github-link-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="https://github.com/MegasterPro" className="btn-github" target="_blank" rel="noopener noreferrer">
            <Github size={24} />
            {t('seeAllProjects')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
