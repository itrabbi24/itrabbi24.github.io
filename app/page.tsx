import Navigation from '@/components/Navigation';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import TechStack  from '@/components/TechStack';
import Projects   from '@/components/Projects';
import Experience      from '@/components/Experience';
import Certifications  from '@/components/Certifications';
import Contact         from '@/components/Contact';
import Footer     from '@/components/Footer';
import BackToTop  from '@/components/BackToTop';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
