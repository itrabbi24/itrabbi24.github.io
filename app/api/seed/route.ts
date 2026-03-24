import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HeroContent from '@/lib/models/HeroContent';
import About from '@/lib/models/About';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import Experience from '@/lib/models/Experience';

export async function POST() {
  await connectDB();

  // Seed Hero
  await HeroContent.findOneAndUpdate({}, {
    name: 'ARG Rabby',
    title: 'Full-Stack Software Developer',
    roles: [
      'Full-Stack Software Developer',
      '.NET & PHP Expert',
      'React & Next.js Developer',
      'Mobile App Developer (Flutter)',
      'REST API Architect',
    ],
    description: 'I build fast, scalable, and beautiful web & mobile applications. 7+ years of experience delivering enterprise-grade software with clean architecture.',
    stats: [
      { label: 'Years Exp.', value: '7+' },
      { label: 'Projects', value: '50+' },
      { label: 'Technologies', value: '20+' },
      { label: 'Commitment', value: '100%' },
    ],
    availableForWork: true,
    cvUrl: '/cv.pdf',
  }, { upsert: true });

  // Seed About
  await About.findOneAndUpdate({}, {
    bio: "I'm ARG Rabby — a Full-Stack Software Developer with 7+ years of experience. I specialize in .NET, PHP/Laravel, React, and Next.js. I love building products that are fast, beautiful, and solve real problems.",
    avatar: 'https://avatars.githubusercontent.com/u/itrabbi24',
    location: 'Bangladesh',
    email: 'itrabbi24@gmail.com',
    phone: '',
    github: 'https://github.com/itrabbi24',
    linkedin: 'https://linkedin.com/in/itrabbi24',
    currentFocus: 'Building scalable SaaS products & open source tools',
    yearsExperience: '7+',
    highlights: [
      'Clean Architecture',
      'High Performance Apps',
      'Full-Stack & Mobile',
      'RESTful API Design',
    ],
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/itrabbi24', icon: 'FiGithub' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/itrabbi24', icon: 'FiLinkedin' },
    ],
  }, { upsert: true });

  // Seed Projects
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: 'Git Message Generator',
      description: 'AI-powered Git commit message generator CLI tool. Helps developers write meaningful, consistent commit messages following conventional commits standards. Supports multiple AI providers and customizable templates.',
      shortDesc: 'AI-powered Git commit message generator CLI.',
      category: 'Tools',
      techStack: ['TypeScript', 'AI/ML', 'Git', 'CLI'],
      githubUrl: 'https://github.com/itrabbi24/Git_Message_Generator',
      liveUrl: '',
      featured: true,
      order: 1,
    },
    {
      title: 'DashLook',
      description: 'Modern, feature-rich dashboard UI kit built for rapid admin panel development. Includes multiple layout options, dark/light mode, fully responsive design, and a comprehensive component library.',
      shortDesc: 'Modern dashboard UI kit with responsive design.',
      category: 'Frontend',
      techStack: ['React', 'Tailwind CSS', 'TypeScript', 'C#'],
      githubUrl: 'https://github.com/itrabbi24/DashLook',
      liveUrl: '',
      featured: true,
      order: 2,
    },
    {
      title: 'Sonner.NetCore',
      description: '.NET Core port of the popular Sonner toast notification library. Elegant, accessible, highly customizable toast notifications for ASP.NET Core and Blazor with zero dependencies.',
      shortDesc: 'Toast notifications library for .NET Core & Blazor.',
      category: '.NET',
      techStack: ['C#', '.NET Core', 'ASP.NET', 'Blazor'],
      githubUrl: 'https://github.com/itrabbi24/Sonner.NetCore',
      liveUrl: '',
      featured: true,
      order: 3,
    },
    {
      title: 'CN Formatter',
      description: 'A Flutter/Dart utility package for formatting consignment note (CN) numbers and courier tracking codes. Handles various courier service formats used in Bangladesh.',
      shortDesc: 'Flutter/Dart CN number formatter package.',
      category: 'Mobile',
      techStack: ['Flutter', 'Dart'],
      githubUrl: 'https://github.com/itrabbi24/CN_Formatter_ARG_RABBY',
      liveUrl: '',
      featured: false,
      order: 4,
    },
    {
      title: 'SS Interior Studio',
      description: 'Professional website for SS Interior Studio — a full interior design company site with service showcases, portfolio gallery, and contact system.',
      shortDesc: 'Interior design company website.',
      category: 'Frontend',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/itrabbi24/SS-Interior-Studio',
      liveUrl: 'http://ssinteriorstudio.com',
      featured: false,
      order: 5,
    },
    {
      title: 'Inventory Dashboard Template',
      description: 'Clean, responsive HTML template for inventory management admin dashboards with data tables, charts, product tracking, and order management UI components.',
      shortDesc: 'Admin dashboard HTML template.',
      category: 'Frontend',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      githubUrl: 'https://github.com/itrabbi24/Inventory-Management-Admin-Dashboard-Html-Template',
      liveUrl: '',
      featured: false,
      order: 6,
    },
  ]);

  // Seed Skills
  await Skill.deleteMany({});
  await Skill.insertMany([
    // Backend
    { name: 'C# / .NET', category: 'Backend', proficiency: 95, color: '#9B59B6', order: 1 },
    { name: 'PHP / Laravel', category: 'Backend', proficiency: 92, color: '#FF2D20', order: 2 },
    { name: 'Node.js', category: 'Backend', proficiency: 85, color: '#68A063', order: 3 },
    { name: 'Python', category: 'Backend', proficiency: 78, color: '#3776AB', order: 4 },
    { name: 'ASP.NET Core', category: 'Backend', proficiency: 90, color: '#512BD4', order: 5 },
    // Frontend
    { name: 'React.js', category: 'Frontend', proficiency: 90, color: '#61DAFB', order: 1 },
    { name: 'Next.js', category: 'Frontend', proficiency: 88, color: '#818CF8', order: 2 },
    { name: 'Vue.js', category: 'Frontend', proficiency: 82, color: '#42B883', order: 3 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 88, color: '#3178C6', order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, color: '#06B6D4', order: 5 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 90, color: '#F7DF1E', order: 6 },
    { name: 'HTML / CSS', category: 'Frontend', proficiency: 95, color: '#E34F26', order: 7 },
    // Database
    { name: 'MS SQL Server', category: 'Database', proficiency: 90, color: '#CC2927', order: 1 },
    { name: 'MySQL', category: 'Database', proficiency: 88, color: '#4479A1', order: 2 },
    { name: 'MongoDB', category: 'Database', proficiency: 82, color: '#47A248', order: 3 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 78, color: '#336791', order: 4 },
    { name: 'Redis', category: 'Database', proficiency: 75, color: '#DC382D', order: 5 },
    // Mobile
    { name: 'Flutter', category: 'Mobile', proficiency: 80, color: '#02569B', order: 1 },
    { name: 'Dart', category: 'Mobile', proficiency: 80, color: '#0175C2', order: 2 },
    // DevOps
    { name: 'Docker', category: 'DevOps', proficiency: 78, color: '#2496ED', order: 1 },
    { name: 'Git / GitHub', category: 'DevOps', proficiency: 92, color: '#F05032', order: 2 },
    { name: 'Linux', category: 'DevOps', proficiency: 80, color: '#FCC624', order: 3 },
    { name: 'Nginx', category: 'DevOps', proficiency: 75, color: '#009639', order: 4 },
    { name: 'CI/CD', category: 'DevOps', proficiency: 72, color: '#2088FF', order: 5 },
  ]);

  // Seed Experience
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      type: 'work',
      role: 'Software Developer',
      company: 'Sundarban Courier Service',
      location: 'Dhaka, Bangladesh',
      period: '2022 – Present',
      description: 'Leading development of enterprise-scale logistics and courier management systems serving thousands of customers daily.',
      highlights: [
        'Architected microservices-based backend with .NET Core',
        'Built real-time package tracking for 10,000+ daily deliveries',
        'Reduced system downtime by 60% through code optimization',
        'Led and mentored a team of 5 developers',
        'Designed RESTful APIs consumed by web and mobile clients',
      ],
      techStack: ['C#', '.NET Core', 'React', 'MS SQL', 'Docker', 'Redis'],
      current: true,
      order: 1,
    },
    {
      type: 'work',
      role: 'Full-Stack Developer',
      company: 'Rotex IT',
      location: 'Dhaka, Bangladesh',
      period: '2020 – 2022',
      description: 'Developed web and mobile applications for clients across e-commerce, ERP, and business automation sectors.',
      highlights: [
        'Delivered 20+ production web applications',
        'Built custom ERP and CRM systems for local businesses',
        'Developed mobile apps using Flutter & Dart',
        'Worked on Laravel-based SaaS products',
      ],
      techStack: ['PHP', 'Laravel', 'Vue.js', 'Flutter', 'MySQL', 'React'],
      current: false,
      order: 2,
    },
    {
      type: 'work',
      role: 'Junior Web Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2017 – 2020',
      description: 'Started career building websites and web apps for local and international clients.',
      highlights: [
        'Built 15+ websites for local businesses',
        'Integrated payment gateways (SSLCommerz, bKash)',
        'Delivered e-commerce solutions using PHP & MySQL',
      ],
      techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
      current: false,
      order: 3,
    },
    {
      type: 'education',
      role: 'B.Sc in Computer Science & Engineering',
      company: 'State University of Bangladesh',
      location: 'Dhaka, Bangladesh',
      period: '2016 – 2020',
      description: 'Graduated with a strong foundation in software engineering, data structures, algorithms, and distributed systems.',
      highlights: [
        'Thesis: Real-time collaborative code editor using WebSocket',
        "Dean's List — consistently high academic performance",
        'Led university coding club & organized hackathons',
      ],
      techStack: [],
      current: false,
      order: 4,
    },
  ]);

  return NextResponse.json({ success: true, message: 'Database seeded successfully with your real data!' });
}
