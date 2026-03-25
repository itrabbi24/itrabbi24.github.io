import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HeroContent from '@/lib/models/HeroContent';
import About from '@/lib/models/About';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import Experience from '@/lib/models/Experience';
import Certification from '@/lib/models/Certification';

export async function POST() {
  await connectDB();

  // ── Hero ──────────────────────────────────────────────
  await HeroContent.findOneAndUpdate({}, {
    name: 'ARG RABBY',
    title: 'Full-Stack Software Developer',
    roles: [
      'Full-Stack Software Developer',
      '.NET Core & PHP/Laravel Expert',
      'React & Next.js Developer',
      'REST API Architect',
      'Problem Solver & Tech Lover',
    ],
    description: 'Experienced Full-Stack Software Developer with 5+ years of experience building scalable and maintainable web applications. Skilled across the full SDLC — from design and architecture to deployment.',
    stats: [
      { label: 'Years Exp.',   value: '5+' },
      { label: 'Projects',     value: '20+' },
      { label: 'Technologies', value: '20+' },
      { label: 'Commitment',   value: '100%' },
    ],
    availableForWork: true,
    cvUrl: 'https://www.rotexit.com/cv.pdf',
  }, { upsert: true });

  // ── About ─────────────────────────────────────────────
  await About.findOneAndUpdate({}, {
    bio: 'Experienced Full-Stack Software Developer with a strong focus on building scalable and maintainable web applications. Skilled in both front-end and back-end development, with proven ability to design, develop, and deploy reliable solutions that meet business and user needs. Proficient in the full software development lifecycle, ensuring high performance, efficiency, and long-term maintainability.',
    avatar: 'https://avatars.githubusercontent.com/u/52894020?v=4',
    location: 'Uttara, Dhaka, Bangladesh',
    email: 'itrabbi24@gmail.com',
    github: 'https://github.com/itrabbi24',
    linkedin: 'https://www.linkedin.com/in/itrabbi24',
    currentFocus: 'Building enterprise logistics and SaaS products',
    yearsExperience: '5+',
  }, { upsert: true });

  // ── Experience ────────────────────────────────────────
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      type: 'work',
      role: 'Software Engineer',
      company: 'Sundarban Courier Service (Pvt) Ltd',
      location: 'Uttara, Dhaka, Bangladesh',
      period: 'Sep 2024 – Present',
      description: 'Working on PCM (Parcel Courier Management) system including desktop application (VB.NET + SQL Server) and web application (.NET Core + SQL Server). Developed Async SMS Service for centralized SMS management.',
      highlights: [
        'PCM Desktop Application — VB.NET + SQL Server (current)',
        'PCM Web Application — .NET Core + SQL Server (current)',
        'Async SMS Service for centralized delivery notifications',
        'RESTful APIs for web and mobile client integration',
      ],
      techStack: ['VB.NET', '.NET Core', 'C#', 'MS SQL Server', 'ASP.NET Core'],
      current: true,
      order: 1,
    },
    {
      type: 'work',
      role: 'Software Engineer',
      company: 'Shodagor Express Limited',
      location: 'Washpur, Keraniganj, Dhaka',
      period: 'Jan 2022 – Sep 2024 · 2 yrs 9 mos',
      description: 'Full-Stack Development & System Support. Designed, developed, and maintained scalable software solutions for logistics and HR operations.',
      highlights: [
        'Financial Transaction System (FTS) — multi-branch sales & expense management',
        'HR Management System — attendance, salary, leave & employee records',
        'User training & adoption programs across departments',
      ],
      techStack: ['C#', 'ASP.NET Core', '.NET Core', 'MS SQL Server', 'Bootstrap', 'jQuery', 'LINQ'],
      current: false,
      order: 2,
    },
    {
      type: 'work',
      role: 'Junior Executive (IT & Software Development)',
      company: 'Sundarban Courier Service (Pvt) Ltd',
      location: 'Uttara, Dhaka, Bangladesh',
      period: 'Oct 2019 – Jan 2022 · 2 yrs 4 mos',
      description: 'Full-stack development using ASP.NET Core, SQL Server, Laravel, and PHP. Built internal enterprise tools for operations, inventory, and transport management.',
      highlights: [
        'Time Sheet Management System — Laravel + PHP + MySQL',
        'IT Stock Inventory Management System — Laravel + PHP + MySQL',
        'Transport Management System — .NET Core + SQL Server',
      ],
      techStack: ['PHP', 'Laravel', 'MySQL', '.NET Core', 'SQL Server', 'JavaScript', 'Bootstrap'],
      current: false,
      order: 3,
    },
    {
      type: 'work',
      role: 'Computer Operator',
      company: 'Sundarban Courier Service (Pvt) Ltd',
      location: 'Kallyanpur, Dhaka',
      period: 'Oct 2017 – Oct 2019 · 2 yrs 1 mo',
      description: 'IT Support Specialist ensuring smooth computer system operations, data entry, and branch-level operational support.',
      highlights: [
        'Day-to-day data entry and parcel tracking operations',
        'Maintained and updated daily operational reports',
        'Supported internal IT help-desk activities',
      ],
      techStack: ['MS Office', 'Data Entry', 'IT Support'],
      current: false,
      order: 4,
    },
    {
      type: 'education',
      role: 'B.Sc. in Computer Science & Engineering (CSE)',
      company: 'European University of Bangladesh (EUB)',
      location: 'Dhaka, Bangladesh',
      period: '2019 – 2022',
      description: 'Graduated in January 2023 with Grade A. Built a strong foundation in computer science principles, algorithms, and practical software engineering.',
      highlights: [
        'Grade: A — Graduated January 2023',
        'Software engineering, algorithms & web technologies',
        'Multiple academic projects using modern tech stacks',
      ],
      techStack: [],
      current: false,
      order: 5,
    },
    {
      type: 'education',
      role: 'Diploma Engineering in Electrical',
      company: 'Rajshahi Institute of Technology (RIT)',
      location: 'Rajshahi, Bangladesh',
      period: '2012 – 2016',
      description: 'Diploma Engineering in Electrical Engineering with comprehensive technical knowledge, practical skills, and analytical problem-solving foundations.',
      highlights: [
        'Electrical systems, circuits, and technical fundamentals',
        'Analytical and problem-solving skill development',
      ],
      techStack: [],
      current: false,
      order: 6,
    },
  ]);

  // ── Certifications ────────────────────────────────────
  await Certification.deleteMany({});
  await Certification.insertMany([
    { title: 'Complete Web Development Course',         issuer: 'Programming Hero',    date: 'Dec 2024',  credentialId: 'WEB9-0941',                                    verifyUrl: '',                                                                             order: 1 },
    { title: 'MERN Stack Level-2 Web Development',     issuer: 'Programming Hero',    date: 'Dec 2024',  credentialId: 'MERN2-2025',                                   verifyUrl: '',                                                                             order: 2 },
    { title: 'SQL (Basic)',                             issuer: 'HackerRank',          date: '',          credentialId: 'AF2E0E1B978F',                                 verifyUrl: 'https://www.hackerrank.com/certificates/af2e0e1b978f',                        order: 3 },
    { title: 'SQL (Intermediate)',                     issuer: 'HackerRank',          date: '',          credentialId: '7AA2A56CBFE6',                                 verifyUrl: 'https://www.hackerrank.com/certificates/7aa2a56cbfe6',                        order: 4 },
    { title: 'SQL (Advanced)',                         issuer: 'HackerRank',          date: '',          credentialId: '232C3CA6B8EA',                                 verifyUrl: 'https://www.hackerrank.com/certificates/232c3ca6b8ea',                        order: 5 },
    { title: '.NET Core Microservices — The Complete Guide', issuer: 'Udemy',         date: 'Oct 2023',  credentialId: 'UC-5adc180e-cdb0-4d1c-a622-f11bc18ec48f',     verifyUrl: 'https://www.udemy.com/certificate/UC-5adc180e-cdb0-4d1c-a622-f11bc18ec48f/', order: 6 },
    { title: 'ASP.NET Core — SOLID and Clean Architecture', issuer: 'Udemy',         date: 'Oct 2023',  credentialId: 'UC-630ce1db-deb3-4a49-99f7-ef6fa600daf2',     verifyUrl: 'https://www.udemy.com/certificate/UC-630ce1db-deb3-4a49-99f7-ef6fa600daf2/', order: 7 },
    { title: 'Database Normalization',                 issuer: 'Great Learning',      date: 'Oct 2024',  credentialId: 'TVCETXRJ',                                    verifyUrl: 'https://www.mygreatlearning.com/certificate/TVCETXRJ',                        order: 8 },
    { title: 'Prompt Engineering for ChatGPT',         issuer: 'Great Learning',      date: 'Oct 2024',  credentialId: 'ERVZZYKK',                                    verifyUrl: 'https://www.mygreatlearning.com/certificate/ERVZZYKK',                        order: 9 },
    { title: 'Fundamentals of Digital Marketing',      issuer: 'Google Digital Garage', date: 'Jun 2020', credentialId: 'HY8 239 TVV',                                verifyUrl: '',                                                                             order: 10 },
  ]);

  // ── Skills ────────────────────────────────────────────
  await Skill.deleteMany({});
  await Skill.insertMany([
    // Backend
    { name: 'C# / .NET',       category: 'Backend',  color: '#512BD4', order: 1 },
    { name: 'ASP.NET Core',    category: 'Backend',  color: '#512BD4', order: 2 },
    { name: 'PHP / Laravel',   category: 'Backend',  color: '#FF2D20', order: 3 },
    { name: 'Node.js',         category: 'Backend',  color: '#5FA04E', order: 4 },
    { name: 'Express',         category: 'Backend',  color: '#888888', order: 5 },
    // Frontend
    { name: 'JavaScript',      category: 'Frontend', color: '#F7DF1E', order: 1 },
    { name: 'TypeScript',      category: 'Frontend', color: '#3178C6', order: 2 },
    { name: 'React',           category: 'Frontend', color: '#61DAFB', order: 3 },
    { name: 'Vue.js',          category: 'Frontend', color: '#4FC08D', order: 4 },
    { name: 'HTML / CSS',      category: 'Frontend', color: '#E34F26', order: 5 },
    { name: 'jQuery',          category: 'Frontend', color: '#0769AD', order: 6 },
    { name: 'Bootstrap',       category: 'Frontend', color: '#7952B3', order: 7 },
    { name: 'Tailwind CSS',    category: 'Frontend', color: '#06B6D4', order: 8 },
    // Database
    { name: 'MS SQL Server',   category: 'Database', color: '#CC2927', order: 1 },
    { name: 'MySQL',           category: 'Database', color: '#4479A1', order: 2 },
    { name: 'PostgreSQL',      category: 'Database', color: '#4169E1', order: 3 },
    { name: 'SQLite',          category: 'Database', color: '#44A8D0', order: 4 },
    { name: 'MongoDB',         category: 'Database', color: '#47A248', order: 5 },
    // Tools
    { name: 'Git / GitHub',    category: 'Tools',    color: '#F05032', order: 1 },
    { name: 'GitHub',          category: 'Tools',    color: '#aaaaaa', order: 2 },
  ]);

  // ── Projects ──────────────────────────────────────────
  await Project.deleteMany({});
  await Project.insertMany([
    { title: 'Field Tracking System (FTS)',        description: 'Real-time field agent tracking and management system for logistics. Supervisors monitor field staff, assign tasks, and track delivery statuses across thousands of daily operations.',           category: 'Enterprise', techStack: ['C#','ASP.NET Core','React','MS SQL','SignalR'],  githubUrl: '', liveUrl: '', featured: true,  status: 'active', order: 1 },
    { title: 'Transport Management System',        description: 'Comprehensive vehicle and transport management platform for tracking fleet operations, driver assignments, route planning, and transport scheduling across the courier network.',              category: 'Enterprise', techStack: ['PHP','Laravel','MySQL','JavaScript','Bootstrap'], githubUrl: '', liveUrl: '', featured: true,  status: 'active', order: 2 },
    { title: 'HR Management System',               description: 'Full-featured HR platform with modules for employee management, leave tracking, attendance, payroll calculation, and performance reporting used across multiple branches.',                   category: 'Enterprise', techStack: ['C#','ASP.NET Core','React','MS SQL'],           githubUrl: '', liveUrl: '', featured: true,  status: 'active', order: 3 },
    { title: 'PCM — Parcel & Courier Management',  description: "Core enterprise system managing the full lifecycle of courier parcels — booking, tracking, delivery confirmation, and reporting for Bangladesh's major courier network.",                   category: 'Enterprise', techStack: ['VB.NET','.NET Core','MS SQL','React'],           githubUrl: '', liveUrl: '', featured: false, status: 'active', order: 4 },
    { title: 'ArwizGlobal Inventory System',       description: 'End-to-end inventory management for global product tracking, stock control, purchase orders, and multi-warehouse management for an international business.',                                category: 'Enterprise', techStack: ['PHP','Laravel','Vue.js','MySQL'],                 githubUrl: '', liveUrl: '', featured: false, status: 'active', order: 5 },
    { title: 'Git Message Generator',              description: 'AI-powered Git commit message generator CLI. Helps developers write meaningful, consistent commit messages following conventional commits standards.',                                        category: 'Tools',      techStack: ['TypeScript','AI/ML','Git','CLI'],                 githubUrl: 'https://github.com/itrabbi24/Git_Message_Generator', liveUrl: '', featured: false, status: 'active', order: 6 },
    { title: 'DashLook',                           description: 'Modern, feature-rich dashboard UI kit built for rapid admin panel development. Multiple layout options, dark/light mode, fully responsive design.',                                          category: 'Frontend',   techStack: ['React','Tailwind CSS','TypeScript'],              githubUrl: 'https://github.com/itrabbi24/DashLook', liveUrl: '', featured: false, status: 'active', order: 7 },
    { title: 'Sonner.NetCore',                     description: '.NET Core port of the popular Sonner toast notification library. Elegant, accessible toast notifications for ASP.NET Core and Blazor with zero dependencies.',                              category: '.NET',       techStack: ['C#','.NET Core','Blazor'],                        githubUrl: 'https://github.com/itrabbi24/Sonner.NetCore', liveUrl: '', featured: false, status: 'active', order: 8 },
    { title: 'CN Formatter',                       description: 'Flutter/Dart utility package for formatting consignment note (CN) numbers and courier tracking codes for Bangladesh courier services.',                                                     category: 'Mobile',     techStack: ['Flutter','Dart'],                                 githubUrl: 'https://github.com/itrabbi24/CN_Formatter_ARG_RABBY', liveUrl: '', featured: false, status: 'active', order: 9 },
    { title: 'SS Interior Studio',                 description: 'Professional website for SS Interior Studio — services showcase, portfolio gallery, and contact system for an interior design company.',                                                     category: 'Frontend',   techStack: ['HTML','CSS','JavaScript'],                        githubUrl: 'https://github.com/itrabbi24/SS-Interior-Studio', liveUrl: 'http://ssinteriorstudio.com', featured: false, status: 'active', order: 10 },
  ]);

  return NextResponse.json({ success: true, message: 'Database seeded with correct data!' });
}
