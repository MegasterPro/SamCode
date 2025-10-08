import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

/* ---------- traductions (importe/étends depuis ton fichier si besoin) ---------- */
const translations = {
  fr: {
    greet: "Bonjour, je suis",
    subtitle: "Développeur Full Stack & Passionné de Cybersécurité et d'AI",
    desc: "Innover pour le Sénégal, coder pour l'avenir",
    projectBtn: "Voir mes projets",
    contactBtn: "Me contacter",
    // <- header / navbar
    logo: "SamCode",
    about: "À propos",
    skills: "Compétences",
    experience: "Parcours",
    projects: "Projets",
    contact: "Contact",
    // About
    aboutMeTitle: "À propos de moi",
    whoAmI: "Qui suis-je ?",
    whoAmIDesc: "Je m'appelle SamCode, développeur et passionné de technologie basé au Sénégal. J'ai effectué mon stage à IBMS à la fin du lycée, où j'ai développé mes compétences en développement, pentest et ma logique de programmation.",
    educationTitle: "Formation",
    educationDesc: "Actuellement étudiant en Licence Mathématiques-Informatiques (LMI) à l'Université de Thiès. J'ai suivi le cours de HackTheBox et pwné plusieurs machines pour renforcer mes compétences en cybersécurité.",
    myGoalTitle: "Mon Objectif",
    myGoalDesc: "Innover toujours et encore plus pour ma patrie. Je travaille actuellement sur <strong> GEN (INGENIUM)</strong>, une IA d'assistance globale pour les programmeurs, afin de faciliter le développement et l'innovation.",
    // Skills
    skillsTitle: "Compétences Techniques",
    // Experience
    experienceTitle: "Parcours & Formation",
    exp1Title: "Stagiaire - Développement & Pentest",
    exp1Org: "IBMS",
    exp1Period: "Fin du lycée",
    exp1Desc1: "Développement d'applications web et logicielles",
    exp1Desc2: "Tests de pénétration et évaluation de sécurité",
    exp1Desc3: "Apprentissage de la détermination et de la rigueur professionnelle",
    exp1Desc4: "Travail en équipe sur des projets réels",
    exp2Title: "Licence Mathématiques-Informatiques (LMI)",
    exp2Org: "Université de Thiès",
    exp2Period: "En cours",
    exp2Desc1: "Formation approfondie en mathématiques appliquées",
    exp2Desc2: "Algorithmique et structures de données",
    exp2Desc3: "Théorie de l'information et cryptographie",
    exp2Desc4: "Projets académiques et recherche",
    exp3Title: "Formation Cybersécurité",
    exp3Org: "HackTheBox",
    exp3Period: "Formation continue",
    exp3Desc1: "Cours avancés en cybersécurité",
    exp3Desc2: "Pwned plusieurs machines avec succès",
    exp3Desc3: "Niveau intermédiaire en pentest",
    exp3Desc4: "Pratique continue des techniques de sécurité",
    // Projects
    projectsTitle: "Projets",
    featuredProjectBadge: "Projet Phare",
    featuredProjectTitle: "GEN (INGENIUM)",
    featuredProjectDesc: "Intelligence Artificielle d'assistance globale pour les programmeurs. Un projet ambitieux visant à révolutionner la façon dont les développeurs travaillent en leur fournissant une assistance intelligente et contextuelle.",
    featuredProjectStatus: "En développement",
    p1Title: "Portfolio 3D Interactif",
    p1Desc: "Site portfolio moderne avec animations Three.js et interface immersive",
    p2Title: "Ona-Akilli",
    p2Desc: "Plateforme de gestion des cours et tableau de bord administrateur",
    p3Title: "Outil de Pentest",
    p3Desc: "Suite d'outils pour l'analyse de sécurité et tests de pénétration",
    p4Title: "Jeux Vidéo Unity",
    p4Desc: "Un jeu vidéo 3D interactif développé avec Unity et C#",
    p5Title: "NEWTON",
    p5Desc: "Palette de site web pour la reconnaissance des écoles et gestion des tâches",
    seeAllProjects: "Voir tous mes projets sur GitHub",
    // Contact
    contactTitle: "Me Contacter",
    contactSubTitle: "Discutons de votre projet",
    contactDesc: "Je suis toujours ouvert à de nouvelles opportunités et collaborations. N'hésitez pas à me contacter pour discuter de vos projets ou simplement pour échanger sur la technologie.",
    location: "Localisation",
    formName: "Nom",
    formNamePlaceholder: "Votre nom",
    formEmail: "Email",
    formEmailPlaceholder: "votre@email.com",
    formMessage: "Message",
    formMessagePlaceholder: "Votre message...",
    formSubmit: "Envoyer le message",
    // Footer
    footerMadeWith: "Fait avec",
    footerMadeBy: "par SamCode",
    footerRights: "Tous droits réservés"
  },
  en: {
    greet: "Hello, I'm",
    subtitle: "Full Stack Developer & Security & AI Enthusiast",
    desc: "Innovating for Senegal, coding for the future",
    projectBtn: "See my projects",
    contactBtn: "Contact me",
    logo: "SamCode",
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    // About
    aboutMeTitle: "About Me",
    whoAmI: "Who am I?",
    whoAmIDesc: "My name is SamCode, a developer and technology enthusiast based in Senegal. I did my internship at IBMS at the end of high school, where I developed my skills in development, pentesting, and determination.",
    educationTitle: "Education",
    educationDesc: "Currently a student in Mathematics-Computer Science (LMI) at the University of Thiès. I have taken the HackTheBox course and pwned several machines to strengthen my cybersecurity skills.",
    myGoalTitle: "My Goal",
    myGoalDesc: "To innovate always and even more for my homeland. I am currently working on <strong>GEN (INGENIUM)</strong>, a global assistance AI for programmers, to facilitate development and innovation.",
    // Skills
    skillsTitle: "Technical Skills",
    // Experience
    experienceTitle: "Experience & Education",
    exp1Title: "Intern - Development & Pentesting",
    exp1Org: "IBMS",
    exp1Period: "End of high school",
    exp1Desc1: "Development of web and software applications",
    exp1Desc2: "Penetration testing and security assessment",
    exp1Desc3: "Learning professional determination and rigor",
    exp1Desc4: "Teamwork on real projects",
    exp2Title: "Bachelor's in Mathematics-Computer Science (LMI)",
    exp2Org: "University of Thiès",
    exp2Period: "Ongoing",
    exp2Desc1: "In-depth training in applied mathematics",
    exp2Desc2: "Algorithms and data structures",
    exp2Desc3: "Information theory and cryptography",
    exp2Desc4: "Academic projects and research",
    exp3Title: "Cybersecurity Training",
    exp3Org: "HackTheBox",
    exp3Period: "Ongoing training",
    exp3Desc1: "Advanced courses in cybersecurity",
    exp3Desc2: "Successfully pwned several machines",
    exp3Desc3: "Intermediate level in pentesting",
    exp3Desc4: "Continuous practice of security techniques",
    // Projects
    projectsTitle: "Projects",
    featuredProjectBadge: "Featured Project",
    featuredProjectTitle: "GEN (INGENIUM)",
    featuredProjectDesc: "A global assistance Artificial Intelligence for programmers. An ambitious project aiming to revolutionize the way developers work by providing them with intelligent and contextual assistance.",
    featuredProjectStatus: "In development",
    p1Title: "Interactive 3D Portfolio",
    p1Desc: "Modern portfolio site with Three.js animations and an immersive interface",
    p2Title: "E-commerce Application",
    p2Desc: "Complete platform with payment management and admin dashboard",
    p3Title: "Pentesting Tool",
    p3Desc: "Suite of tools for security analysis and penetration testing",
    p4Title: "Analytics Dashboard",
    p4Desc: "Dashboard with real-time data visualization",
    p5Title: "Cross-platform Mobile App",
    p5Desc: "Mobile application for task management and productivity",
    seeAllProjects: "See all my projects on GitHub",
    // Contact
    contactTitle: "Contact Me",
    contactSubTitle: "Let's discuss your project",
    contactDesc: "I am always open to new opportunities and collaborations. Feel free to contact me to discuss your projects or just to chat about technology.",
    location: "Location",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "your@email.com",
    formMessage: "Message",
    formMessagePlaceholder: "Your message...",
    formSubmit: "Send Message",
    // Footer
    footerMadeWith: "Made with",
    footerMadeBy: "by SamCode",
    footerRights: "All rights reserved"
  },
  ch: {
    greet: "你好，我是",
    subtitle: "全栈开发者 · 网络安全和人工智能爱好者",
    desc: "为塞内加尔创新，为未来编程",
    projectBtn: "查看我的项目",
    contactBtn: "联系我",
    logo: "SamCode",
    about: "关于",
    skills: "技能",
    experience: "经历",
    projects: "项目",
    contact: "联系",
    // About
    aboutMeTitle: "关于我",
    whoAmI: "我是谁？",
    whoAmIDesc: "我叫SamCode，是塞内加尔的一名开发人员和技术爱好者。高中毕业后，我在IBMS实习，在那里我培养了开发、渗透测试和决心方面的技能。",
    educationTitle: "教育背景",
    educationDesc: "目前是蒂斯大学数学与计算机科学（LMI）专业的学生。我参加了HackTheBox的课程，并成功破解了多台机器，以增强我的网络安全技能。",
    myGoalTitle: "我的目标",
    myGoalDesc: "为我的祖国不断创新。我目前正在开发<strong>GEN (INGENIUM)</strong>，这是一个为程序员提供全球辅助的人工智能，旨在促进开发和创新。",
    // Skills
    skillsTitle: "技术技能",
    // Experience
    experienceTitle: "经历与教育",
    exp1Title: "实习生 - 开发与渗透测试",
    exp1Org: "IBMS",
    exp1Period: "高中毕业",
    exp1Desc1: "Web和软件应用程序开发",
    exp1Desc2: "渗透测试和安全评估",
    exp1Desc3: "学习专业的决心和严谨",
    exp1Desc4: "参与真实项目的团队合作",
    exp2Title: "数学与计算机科学学士（LMI）",
    exp2Org: "蒂斯大学",
    exp2Period: "在读",
    exp2Desc1: "应用数学深度培训",
    exp2Desc2: "算法和数据结构",
    exp2Desc3: "信息论和密码学",
    exp2Desc4: "学术项目和研究",
    exp3Title: "网络安全培训",
    exp3Org: "HackTheBox",
    exp3Period: "持续培训",
    exp3Desc1: "网络安全高级课程",
    exp3Desc2: "成功破解多台机器",
    exp3Desc3: "中级渗透测试水平",
    exp3Desc4: "持续实践安全技术",
    // Projects
    projectsTitle: "项目",
    featuredProjectBadge: "精选项目",
    featuredProjectTitle: "GEN (INGENIUM)",
    featuredProjectDesc: "为程序员提供全球辅助的人工智能。一个雄心勃勃的项目，旨在通过提供智能和上下文相关的辅助来彻底改变开发人员的工作方式。",
    featuredProjectStatus: "开发中",
    p1Title: "交互式3D作品集",
    p1Desc: "具有Three.js动画和沉浸式界面的现代作品集网站",
    p2Title: "电子商务应用",
    p2Desc: "具有支付管理和管理员仪表板的完整平台",
    p3Title: "渗透测试工具",
    p3Desc: "用于安全分析和渗透测试的工具套件",
    p4Title: "分析仪表板",
    p4Desc: "具有实时数据可视化的仪表板",
    p5Title: "跨平台移动应用",
    p5Desc: "用于任务管理和提高生产力的移动应用程序",
    seeAllProjects: "在GitHub上查看我的所有项目",
    // Contact
    contactTitle: "联系我",
    contactSubTitle: "让我们讨论您的项目",
    contactDesc: "我随时欢迎新的机会和合作。请随时与我联系，讨论您的项目或只是聊聊技术。",
    location: "地点",
    formName: "姓名",
    formNamePlaceholder: "您的姓名",
    formEmail: "电子邮件",
    formEmailPlaceholder: "your@email.com",
    formMessage: "消息",
    formMessagePlaceholder: "您的消息...",
    formSubmit: "发送消息",
    // Footer
    footerMadeWith: "制作",
    footerMadeBy: "由 SamCode",
    footerRights: "版权所有"
  },
  esp: {
    greet: "Hola, soy",
    subtitle: "Desarrollador Full Stack y entusiasta de Ciberseguridad e IA",
    desc: "Innovar para Senegal, programar para el futuro",
    projectBtn: "Ver mis proyectos",
    contactBtn: "Contáctame",
    logo: "SamCode",
    about: "Acerca de",
    skills: "Habilidades",
    experience: "Trayectoria",
    projects: "Proyectos",
    contact: "Contacto",
    // About
    aboutMeTitle: "Acerca de mí",
    whoAmI: "¿Quién soy?",
    whoAmIDesc: "Me llamo SamCode, un desarrollador y entusiasta de la tecnología con sede en Senegal. Realicé mis prácticas en IBMS al final del bachillerato, donde desarrollé mis habilidades en desarrollo, pentesting y determinación.",
    educationTitle: "Formación",
    educationDesc: "Actualmente estudiante de la Licenciatura en Matemáticas-Informática (LMI) en la Universidad de Thiès. He seguido el curso de HackTheBox y he vulnerado varias máquinas para fortalecer mis habilidades en ciberseguridad.",
    myGoalTitle: "Mi Objetivo",
    myGoalDesc: "Innovar siempre y aún más por mi patria. Actualmente estoy trabajando en <strong>GEN (INGENIUM)</strong>, una IA de asistencia global para programadores, para facilitar el desarrollo y la innovación.",
    // Skills
    skillsTitle: "Habilidades Técnicas",
    // Experience
    experienceTitle: "Trayectoria y Formación",
    exp1Title: "Becario - Desarrollo y Pentesting",
    exp1Org: "IBMS",
    exp1Period: "Final del bachillerato",
    exp1Desc1: "Desarrollo de aplicaciones web y de software",
    exp1Desc2: "Pruebas de penetración y evaluación de seguridad",
    exp1Desc3: "Aprendizaje de la determinación y el rigor profesional",
    exp1Desc4: "Trabajo en equipo en proyectos reales",
    exp2Title: "Licenciatura en Matemáticas-Informática (LMI)",
    exp2Org: "Universidad de Thiès",
    exp2Period: "En curso",
    exp2Desc1: "Formación approfondie en mathématiques appliquées",
    exp2Desc2: "Algoritmia y estructuras de datos",
    exp2Desc3: "Teoría de la información y criptografía",
    exp2Desc4: "Proyectos académicos e investigación",
    exp3Title: "Formación en Ciberseguridad",
    exp3Org: "HackTheBox",
    exp3Period: "Formación continua",
    exp3Desc1: "Cursos avanzados en ciberseguridad",
    exp3Desc2: "Vulnerado varias máquinas con éxito",
    exp3Desc3: "Nivel intermedio en pentesting",
    exp3Desc4: "Práctica continua de técnicas de seguridad",
    // Projects
    projectsTitle: "Proyectos",
    featuredProjectBadge: "Proyecto Destacado",
    featuredProjectTitle: "GEN (INGENIUM)",
    featuredProjectDesc: "Inteligencia Artificial de asistencia global para programadores. Un proyecto ambicioso que busca revolucionar la forma en que los desarrolladores trabajan proporcionándoles asistencia inteligente y contextual.",
    featuredProjectStatus: "En desarrollo",
    p1Title: "Portfolio 3D Interactivo",
    p1Desc: "Sitio de portafolio moderno con animaciones de Three.js e interfaz inmersiva",
    p2Title: "Aplicación de E-commerce",
    p2Desc: "Plataforma completa con gestión de pagos y panel de administración",
    p3Title: "Herramienta de Pentesting",
    p3Desc: "Suite de herramientas para análisis de seguridad y pruebas de penetración",
    p4Title: "Dashboard de Analítica",
    p4Desc: "Tablero con visualización de datos en tiempo real",
    p5Title: "App Móvil Multiplataforma",
    p5Desc: "Aplicación móvil para la gestión de tareas y productividad",
    seeAllProjects: "Ver todos mis proyectos en GitHub",
    // Contact
    contactTitle: "Contactarme",
    contactSubTitle: "Hablemos de tu proyecto",
    contactDesc: "Siempre estoy abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme para discutir tus proyectos o simplemente para charlar sobre tecnología.",
    location: "Ubicación",
    formName: "Nombre",
    formNamePlaceholder: "Tu nombre",
    formEmail: "Correo electrónico",
    formEmailPlaceholder: "tu@email.com",
    formMessage: "Mensaje",
    formMessagePlaceholder: "Tu mensaje...",
    formSubmit: "Enviar mensaje",
    // Footer
    footerMadeWith: "Hecho con",
    footerMadeBy: "por SamCode",
    footerRights: "Todos los derechos reservados"
  },
};


const TranslationContext = createContext({
  lang: 'fr',
  setLang: () => {},
  t: (key) => key,
});

export function TranslationProvider({ children, defaultLang = 'fr' }) {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && window.localStorage.getItem('site-lang');
    if (saved && translations[saved]) setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('site-lang', lang);
  }, [lang]);

  const t = useMemo(() => (key) => {
    if (!key) return '';
    const bucket = translations[lang] || translations.fr;
    return bucket[key] ?? key;
  }, [lang]);

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}

/* ---------- composant simple pour insérer du texte traduit ---------- */
export function Translate({ k, children, ...props }) {
  const { t } = useTranslation();
  const key = k ?? (typeof children === 'string' ? children : '');
  return <span {...props}>{t(key)}</span>;
}

/* ---------- petit sélecteur de langue réutilisable ---------- */
export function LanguageSwitcher({ style, buttonStyle }) {
  const { lang, setLang } = useTranslation();
  const base = { border: 'none', background: 'transparent', color: '#d1d5db', padding: '6px 8px', fontSize: 12, cursor: 'pointer', borderRadius: 6, opacity: 0.9, ...buttonStyle };
  const active = { background: 'rgba(14,165,233,0.12)', color: '#0ea5e9' };

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', ...style }}>
      <button aria-label="Français" onClick={() => setLang('fr')} style={lang === 'fr' ? { ...base, ...active } : base}>FR</button>
      <button aria-label="English" onClick={() => setLang('en')} style={lang === 'en' ? { ...base, ...active } : base}>EN</button>
      <button aria-label="中文" onClick={() => setLang('ch')} style={lang === 'ch' ? { ...base, ...active } : base}>CH</button>
      <button aria-label="Español" onClick={() => setLang('esp')} style={lang === 'esp' ? { ...base, ...active } : base}>ES</button>
    </div>
  );
}

/* ---------- exemple d'utilisation ----------
import { TranslationProvider, Translate, LanguageSwitcher } from './components/Translation';

function App() {
  return (
    <TranslationProvider defaultLang="fr">
      <header>
        <LanguageSwitcher />
      </header>
      <main>
        <h1><Translate k="greet" /> <span>SamCode</span></h1>
        <p><Translate k="subtitle" /></p>
      </main>
    </TranslationProvider>
  );
}
*/
