import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Heart, Brain, Eye, Cpu, Phone, Mail, Smartphone, Github, Twitter, Linkedin, Instagram, Award, Zap, Users, Lightbulb } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './media/logo.jpg';
import labImg1 from './media/lab1.jpg';
import labImg2 from './media/lab2.jpg';
import labImg3 from './media/lab3.jpg';
import hqImage from './media/HQ.jpg';

// Background grid component
const BackgroundGrid = ({ rows = 8, cols = 8, className = "" }) => {
  const cells = useMemo(() => {
    return Array.from({ length: rows * cols }).map((_, i) => (
      <div key={i} className="border-t border-l border-gray-800"></div>
    ));
  }, [rows, cols]);

  return (
    <div className={`grid ${cols <= 12 ? `grid-cols-${cols}` : 'grid-cols-12'} ${rows <= 12 ? `grid-rows-${rows}` : 'grid-rows-12'} h-full w-full ${className}`}>
      {cells}
    </div>
  );
};
const LabCarousel = ({ foundingYear }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      image: labImg1,
      description: "The journey started from neural research",
      progressWidth: "w-1/4",
      year: 2018
    },
    {
      image: labImg2,
      description: "Next came integration of body parts",
      progressWidth: "w-2/4",
      year: 2020
    },
    {
      image: labImg3,
      description: "Now we have full integrated systems",
      progressWidth: "w-3/4",
      year: 2024
    }
  ];

  const categories = ["Neural research", "Body enhancements", "Full integration"];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div
        className="w-full h-64 md:h-96 bg-black border border-gray-800 rounded-lg overflow-hidden group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10 bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[activeIndex].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/60 to-black/40"></div>
        <div className="relative h-full p-6 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-500/20 p-2 rounded">
              <Brain className="text-cyan-500" size={24} />
            </div>
            <div className="text-sm text-cyan-400">{slides[activeIndex].year}</div>
          </div>

          <div className="space-y-3">
            <div className="w-full h-1 bg-gray-800/70 relative">
              <div className={`absolute top-0 left-0 h-1 bg-cyan-500 ${slides[activeIndex].progressWidth}`}></div>
            </div>

            <div className="flex justify-between text-xs text-gray-300">
              {categories.map((category, index) => (
                <span 
                  key={index} 
                  className={`cursor-pointer transition-all ${activeIndex === index ? 'text-cyan-400' : 'text-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="text-gray-300 text-sm bg-black/40 p-3 rounded">
              {slides[activeIndex].description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const location = useLocation();

  const scrollToSectionURL = () => {
    const searchParams = new URLSearchParams(location.search);
    const sectionId = searchParams.get('section');
    
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.search.includes('section=')) {
      scrollToSectionURL();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]); 

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMoving.current) {
        isMoving.current = true;
    
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${e.clientX - 128}px, ${e.clientY - 128}px)`;
          }
          
          clearTimeout(cursorTimeout.current);
          cursorTimeout.current = setTimeout(() => {
            isMoving.current = false;
          }, 20); 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(cursorTimeout.current);
    };
  }, []);

  // Current year calculation
  const currentYear = new Date().getFullYear();
  const foundingYear = currentYear - 7;
  
  // Success stats data
  const successStats = [
    {
      title: "Years of Innovation",
      value: "7+",
      description: "Pioneering human enhancement since 2018",
      icon: <Zap className="text-cyan-400 w-10 h-10" />
    },
    {
      title: "Enhancements Sold",
      value: "127,834",
      description: "Helping clients exceed biological limitations",
      icon: <CircuitBoard className="text-cyan-400 w-10 h-10" />
    },
    {
      title: "Patents & Innovations",
      value: "42",
      description: "Groundbreaking technologies developed",
      icon: <Cpu className="text-cyan-400 w-10 h-10" />
    },
    {
      title: "Industry Awards",
      value: "16",
      description: "Including 3 Biomechanical Excellence Awards",
      icon: <Award className="text-cyan-400 w-10 h-10" />
    }
  ];
  
  // Team members data
  const teamMembers = useMemo(() => [
    {
      name: "Dr. Konal Debnath",
      title: "Founder and Technical Lead",
      bio: "The man behind it all, the pioneer of our research and the one who holds us together",
      icon: <Lightbulb className="text-cyan-400 w-12 h-12" />
    },
    {
      name: "Dr. Eliza Chen",
      title: "Chief Innovation Officer",
      bio: "Pioneer in neural interface technology with over 15 years in advanced cybernetics research.",
      icon: <Brain className="text-cyan-400 w-12 h-12" />
    },
    {
      name: "Marcus Rodriguez",
      title: "Director of Cybernetic Design",
      bio: "Former military biomedical engineer specializing in adaptive enhancement systems.",
      icon: <CircuitBoard className="text-cyan-400 w-12 h-12" />
    },
    {
      name: "Dr. Sarah Novak",
      title: "Head of Clinical Integration",
      bio: "Leading authority in bio-electronic compatibility and organic-synthetic fusion.",
      icon: <Heart className="text-cyan-400 w-12 h-12" />
    }
  ], []);
  
  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      <div
        ref={cursorRef}
        className="fixed w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none z-10 opacity-50"
        style={{
          willChange: 'transform',
        }}
      />

      {/* background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-blue-900/20 to-transparent"></div>
        </div>
      </div>

      {/* Navigation */}
      <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logo} alt="CyborgCorp Logo" className="h-6 w-auto" />
            <span className="text-xl font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Home</Link>
            <Link to="/about" className="text-cyan-400 transition-colors cursor-pointer hover:scale-105">About</Link>
            <Link to="/reviews" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Reviews</Link>
            <Link to="/nerd" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-4">
            <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
              Buy Now
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-900 border-t border-gray-800 py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <Link to="/" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Home</Link>
              <Link to="/about" className="text-cyan-400 transition-colors py-2 cursor-pointer">About</Link>
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Reviews</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
              <Link to="/nerd" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Buy Now</Link>
            </div>
          </nav>
        )}
      </header>

      {/* About Hero Section */}
      <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 left-0 w-full md:w-3/4 bg-cover bg-center opacity-60" 
               style={{ backgroundImage: `url(${hqImage})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black"></div>
          </div>
          <div className="absolute inset-0 z-0 opacity-10">
            <BackgroundGrid />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Our <span className="text-cyan-500">Mission</span>
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                Founded in {foundingYear}, CyborgCorp is at the forefront of human enhancement technology.
              </p>
              <p className="text-gray-400 text-lg mb-8">
                We're dedicated to pushing the boundaries of what's possible, merging cutting-edge cybernetics with human potential to create a future where limitations are optional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 text-center">
                  Our Products
                </Link>
                <Link to="/contact" className="border border-cyan-500 hover:bg-cyan-500/10 text-cyan-500 px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 text-center">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-full w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 backdrop-blur-xl flex items-center justify-center mx-auto relative group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-cyan-900/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-48 h-48 md:w-72 md:h-72 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-pulse"></div>
                  <div className="absolute inset-8 rounded-full border border-cyan-400"></div>
                  <div className="absolute inset-16 rounded-full border border-cyan-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircuitBoard className="text-cyan-400 w-16 h-16 md:w-24 md:h-24 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 bg-gray-950 relative">
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-cyan-500">Story</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                From a research lab to the world's leading cybernetic enhancement corporation.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <p className="text-gray-300 mb-4">
                CyborgCorp began as a small research initiative led by Dr. Eliza Chen in 2018, focused on developing neural interface technology for medical applications.
                </p>
                <p className="text-gray-300 mb-4">
                Our breakthrough came when we successfully integrated a proprietary NeuroBridge™ prototype with the human nervous system, allowing unprecedented levels of control and feedback.
                </p>
                <p className="text-gray-300 mb-4">
                Within two years, we had expanded from neural interfaces to full cybernetic enhancements, establishing our first clinical facility for integrated procedures.
                </p>
                <p className="text-gray-300">
                Today, we operate in 27 countries with over 200 certified cybernetic specialists, having helped more than 10,000 clients transcend their biological limitations through our advanced enhancement technologies.
                </p>
            </div>
            <LabCarousel foundingYear={foundingYear} />
            </div>
        </div>
      </section>

      {/* Our Success Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid rows={6} cols={6} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-cyan-500">Success</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The numbers that demonstrate our impact on human enhancement technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-black/40 border border-gray-800 rounded-lg p-6 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-cyan-500/20 p-2 rounded-lg">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{stat.title}</h3>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid rows={10} cols={10} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-cyan-500">Values</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide our innovation and define our approach to human enhancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 p-6 rounded-lg relative group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="bg-cyan-500/20 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <Brain className="text-cyan-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">Innovation</h3>
              <p className="text-gray-400">
                We constantly push the boundaries of what's possible, developing technologies that seemed impossible just years ago.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 p-6 rounded-lg relative group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="bg-cyan-500/20 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <Heart className="text-cyan-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">Integrity</h3>
              <p className="text-gray-400">
                Every enhancement we create adheres to the highest standards of safety, quality, and bioethical responsibility.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 p-6 rounded-lg relative group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="bg-cyan-500/20 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <Eye className="text-cyan-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">Vision</h3>
              <p className="text-gray-400">
                We envision a future where human potential is limited only by imagination, not by biology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-cyan-500">Team</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the visionaries behind CyborgCorp's revolutionary technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-black border border-gray-800 rounded-lg overflow-hidden group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="h-38 bg-gray-900 flex items-center justify-center p-6 group-hover:bg-gray-900/80 transition-colors">
                  <div className="w-24 h-24 rounded-full bg-cyan-900/40 flex items-center justify-center">
                    {member.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                  <p className="text-cyan-500 text-sm mb-3">{member.title}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission Section */}
      <section className="py-12 md:py-16 bg-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-cyan-800/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-cyan-800/30 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Join Our Mission</h2>
            <p className="text-cyan-100 max-w-2xl mx-auto">
              Whether as a client, partner, or team member, be part of the movement that's redefining human potential.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto justify-center">
            <Link to="/contact" className="bg-black/30 backdrop-blur-sm py-3 px-6 rounded-lg border border-transparent hover:border-cyan-400 transition-all cursor-pointer text-center group">
              <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">Contact Us</span>
            </Link>
            <Link to="/contact" className="bg-black/30 backdrop-blur-sm py-3 px-6 rounded-lg border border-transparent hover:border-cyan-400 transition-all cursor-pointer text-center group">
              <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">Careers</span>
            </Link>
            <Link to="/marketplace" className="bg-cyan-500 py-3 px-6 rounded-lg text-black font-medium hover:bg-cyan-400 transition-colors cursor-pointer text-center">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={logo} alt="CyborgCorp Logo" className="h-6 w-auto" />
                <span className="text-lg font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Pushing the boundaries of human potential through advanced cybernetic enhancements since 2018.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace?category=Limb" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Limb Enhancements</Link></li>
                <li><Link to="/marketplace?category=Eye" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Visual Systems</Link></li>
                <li><Link to="/marketplace?category=Internal%20Organ" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Internal Organs</Link></li>
                <li><Link to="/marketplace?category=Neuralink" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Neural Interfaces</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-cyan-400 transition-colors cursor-pointer">About Us</Link></li>
                <li><Link to="/reviews" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Testimonials</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to='/privacyPolicy' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</Link></li>
                <li><Link to='/termsOfService' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</Link></li>
                <li><Link to='/termsOfService?section=warranty' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Warranty Info</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Clinical Trials</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {currentYear} CyborgCorp. All rights reserved. Human/Machine Integration License #45291-B</p>
          </div>
        </div>
      </footer>
    </div>
  );
}