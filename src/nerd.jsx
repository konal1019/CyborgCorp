import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Heart, Brain, Eye, Ear, Hand, BrainCog, Shield, Zap, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

// Background grid component
const BackgroundGrid = ({ rows = 16, cols = 16, className = "" }) => {
  const cells = [];
  for (let i = 0; i < rows * cols; i++) {
    cells.push(<div key={i} className="border-t border-l border-gray-800"></div>);
  }

  return (
    <div
      className={`grid h-full w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {cells}
    </div>
  );
};

export default function NerdPage() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);
  
  const scrollToHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Current year calculation
  const currentYear = new Date().getFullYear();
  const foundingYear = currentYear - 7;

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
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

  // Navigation link classes
  const getNavLinkClass = (path) => {
    return `hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105 ${location.pathname === path ? 'text-cyan-400' : ''}`;
  };

  const getMobileNavLinkClass = (path) => {
    return `hover:text-cyan-400 transition-colors py-2 cursor-pointer ${location.pathname === path ? 'text-cyan-400' : ''}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 relative">
      {/* Cursor effect */}
      <div
        ref={cursorRef}
        className="fixed w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none z-10 opacity-50"
        style={{
          willChange: 'transform',
        }}
      />

      {/* Global Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-blue-900/20 to-transparent"></div>
          <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/10 to-transparent"></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-t from-teal-900/10 to-transparent"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-5 mix-blend-screen"></div>
      </div>

      {/* Navigation - Fixed to top */}
      <header className="fixed top-0 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logo} alt="CyborgCorp Logo" className="h-6 w-auto" />
            <span className="text-xl font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className={getNavLinkClass('/')}>Home</Link>
            <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
            <Link to="/reviews" className={getNavLinkClass('/reviews')}>Reviews</Link>
            <Link to="/nerd" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</Link>
            <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* CTA Button container */}
          <div className="hidden md:flex gap-4">
            <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
              Buy Now
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-900 border-t border-gray-800 py-4">
            <div className="max-w-6xl mx-auto px-4 flex flex-col gap-4">
              <Link to="/" className={getMobileNavLinkClass('/')}>Home</Link>
              <Link to="/about" className={getMobileNavLinkClass('/about')}>About</Link>
              <Link to="/reviews" className={getMobileNavLinkClass('/reviews')}>Reviews</Link>
              <Link to="/contact" className={getMobileNavLinkClass('/contact')}>Contact</Link>
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Buy Now</Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content Area - Added padding-top to account for fixed header */}
      <div className="flex-grow max-w-6xl mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Background grid overlay for title */}
        <div className="absolute inset-x-0 top-0 h-96 z-0 opacity-20">
          <BackgroundGrid rows={30} cols={15} />
        </div>

        {/* Title */}
        <h1 id="top" className="text-4xl md:text-6xl font-bold text-center text-cyan-400 mb-12 relative z-10 mt-12">
          The Future of Technology
        </h1>

        {/* Introduction Section */}
        <section id="intro" className="relative bg-gradient-to-br from-blue-900/30 to-cyan-900/20 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-blue-800/40 shadow-lg shadow-cyan-900/20 mb-16 z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="p-6 rounded-xl relative overflow-hidden aspect-square w-full max-w-xs flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-950"></div>
                <div className="absolute inset-0 border border-cyan-600 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Zap size={128} className="text-cyan-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-cyan-300">Redefining Human Potential</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Welcome to CyborgCorp's cutting-edge technology showcase, where the boundaries between human and machine blur into a new frontier of possibility. Our revolutionary cybernetic enhancements aren't just products—they're gateways to an elevated existence.
                </p>
                <p>
                  Each of our innovations is meticulously engineered to integrate seamlessly with human biology, enhancing natural capabilities while introducing entirely new dimensions of perception and interaction with the world around you.
                </p>
                <p>
                  From enhanced sensory perception to unprecedented physical capabilities, our suite of cybernetic augmentations represents the pinnacle of human-machine symbiosis—a true evolution of what it means to be human in the digital age.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-800/40">Neural Integration</span>
                  <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-800/40">Enhanced Perception</span>
                  <span className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-800/40">Physical Augmentation</span>
                  <span className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-800/40">Longevity Technology</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Navigation Bar - Manually created */}
        <div className="top-20 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg mb-16 border border-gray-800 overflow-x-auto z-20">
          <nav className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollToSection('intro')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <Zap size={16} className="inline mr-2" />
              Introduction
            </button>
            <button
              onClick={() => scrollToSection('cybernetic-eyes')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <Eye size={16} className="inline mr-2" />
              Cybernetic Eyes
            </button>
            <button
              onClick={() => scrollToSection('bionic-ears')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <Ear size={16} className="inline mr-2" />
              Bionic Ears
            </button>
            <button
              onClick={() => scrollToSection('augmented-limbs')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <Hand size={16} className="inline mr-2" />
              Augmented Limbs
            </button>
            <button
              onClick={() => scrollToSection('neuralinks')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <BrainCog size={16} className="inline mr-2" />
              Neuralinks
            </button>
            <button
              onClick={() => scrollToSection('blood-analyzers')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <Heart size={16} className="inline mr-2" />
              Blood Analyzers
            </button>
            <button
              onClick={() => scrollToSection('subdermal-displays')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <CircuitBoard size={16} className="inline mr-2" />
              Subdermal Displays
            </button>
            <button
              onClick={() => scrollToSection('immune-systems')}
              className="text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap px-2 py-1 text-sm hover:bg-gray-800/50 rounded"
            >
              <Shield size={16} className="inline mr-2" />
              Enhanced Immune Systems
            </button>
          </nav>
        </div>

        {/* Technology Sections - Each section written out manually */}
        {/* Cybernetic Eyes Section */}
        <section
          id="cybernetic-eyes"
          className="relative bg-gray-950 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-cyan-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <BackgroundGrid rows={12} cols={12} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-950"></div>
                <div className="absolute inset-0 border border-cyan-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Eye size={128} className="text-cyan-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Cybernetic Eyes</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Our Cybernetic Eye modules redefine visual perception. Featuring adaptive optics and advanced spectral filters, users can perceive the full electromagnetic spectrum, from infrared to ultraviolet, opening up a new world of sensory input.
                </p>
                <p>
                  Equipped with a neural-linked ocular sensor array, our eyes provide unparalleled image resolution and dynamic range. Furthermore, our ocular implants feature cutting-edge quantum entanglement communication, enabling instantaneous data transmission and real-time visual overlays. These systems also provide automatic focus adjustment and advanced depth perception, surpassing the capabilities of organic eyes.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Bionic_eye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bionic Ears Section */}
        <section
          id="bionic-ears"
          className="relative bg-black p-8 md:p-12 rounded-lg backdrop-blur-sm border border-blue-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-indigo-900 opacity-20"></div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-950"></div>
                <div className="absolute inset-0 border border-blue-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Ear size={128} className="text-blue-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Bionic Ears</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Bionic Ear represents a breakthrough in auditory enhancement. Our auditory implants use nano-scale acoustic receptors that capture a broader frequency range than the human ear.
                </p>
                <p>
                  With our auditory processing algorithms, users can filter out unwanted noise, focus on specific sound sources, and even translate frequencies outside the normal human range. The enhanced model features directional sound focusing, allowing users to isolate specific conversations in crowded environments. In addition, it can receive and process sub-audible frequencies, offering a new dimension in auditory perception.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Hearing_aid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Augmented Limbs Section */}
        <section
          id="augmented-limbs"
          className="relative bg-gray-950 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-emerald-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <BackgroundGrid rows={12} cols={12} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-950"></div>
                <div className="absolute inset-0 border border-emerald-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Hand size={128} className="text-emerald-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Augmented Limbs</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Our Augmented Limbs series offer unparalleled strength and dexterity. Constructed from a carbon-fiber alloy and powered by micro-hydraulic actuators, these limbs mimic organic movement while delivering tenfold increases in power.
                </p>
                <p>
                  Embedded sensors provide haptic feedback, giving users a sense of touch as precise as their original limbs. Advanced models incorporate neural pathway mapping, enabling users to control the limbs with intuitive thought. They also include adaptive strength calibration, ensuring they can perform delicate tasks with precision or engage in extreme activities safely.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Exoskeleton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Neuralinks Section */}
        <section
          id="neuralinks"
          className="relative bg-black p-8 md:p-12 rounded-lg backdrop-blur-sm border border-purple-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 to-violet-900 opacity-20"></div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-950"></div>
                <div className="absolute inset-0 border border-purple-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <BrainCog size={128} className="text-purple-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Neuralinks</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Our Neuralinks are the pinnacle of human-machine interface technology. Using a biocompatible mesh woven at the nanoscale, the Neuralink creates a seamless connection between the user's brain and external digital systems.
                </p>
                <p>
                  This allows for direct control of digital devices with thought, instantaneous access to cloud-based information, and even sensory augmentation. In addition, our neural links use cognitive offloading to extend memory, and the synaptic plasticity augmentation allows for unparalleled brain learning.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Neuralink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Blood Analyzers Section */}
        <section
          id="blood-analyzers"
          className="relative bg-gray-950 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-red-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900 to-pink-900 opacity-20"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-red-950"></div>
                <div className="absolute inset-0 border border-red-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Heart size={128} className="text-red-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Integrated Blood Analyzers</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Integrated Blood Analyzer is a revolutionary device that monitors your internal health in real time. Using nano-scale biosensors, it continuously samples and analyzes your blood chemistry.
                </p>
                <p>
                  This device can provide early warnings for a variety of health conditions, including infections, nutrient deficiencies, and even early-stage cancers. The device's ability to detect subtle changes in blood composition allows for personalized health monitoring. It can track key health indicators and provide insights into your body's response to diet, exercise, and environment, promoting proactive healthcare management.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Blood_test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Subdermal Displays Section */}
        <section
          id="subdermal-displays"
          className="relative bg-black p-8 md:p-12 rounded-lg backdrop-blur-sm border border-amber-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <BackgroundGrid rows={12} cols={12} />
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-amber-950"></div>
                <div className="absolute inset-0 border border-amber-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <CircuitBoard size={128} className="text-amber-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Subdermal Displays</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Our Subdermal Display technology allows for the seamless integration of information directly into your skin. These ultra-thin, flexible displays are embedded beneath the skin and can project a variety of information.
                </p>
                <p>
                  This includes notifications, health metrics, and even interactive interfaces, all visible beneath your skin. The displays use advanced LED technology, allowing them to be energy-efficient and long-lasting. They can be customized to show various types of information and can even be integrated with other devices, such as smartwatches and smartphones, for a truly interconnected experience.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Smart_tattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Immune Systems Section */}
        <section
          id="immune-systems"
          className="relative bg-gray-950 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-teal-800/60 shadow-lg shadow-cyan-900/20 overflow-hidden z-10 mb-16"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900 to-green-900 opacity-20"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="aspect-square w-full max-w-xs relative rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-teal-950"></div>
                <div className="absolute inset-0 border border-teal-800/60 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Shield size={128} className="text-teal-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Enhanced Immune Systems</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Our Enhanced Immune System technology is designed to supercharge your body's natural defenses. By introducing genetically modified immune cells, we can enhance your body's ability to fight off infections.
                </p>
                <p>
                  These cells can identify and neutralize a wide range of pathogens, ensuring that your body is always ready to defend against viruses and bacteria. This technology not only protects against common infections but also offers long-term health benefits. It can prevent the development of certain diseases and allergies and promote overall vitality and well-being.
                </p>
              </div>
              <div className="flex gap-4 items-center mt-6">
                <a
                  href="https://en.wikipedia.org/wiki/Immune_system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
                <button
                  onClick={() => scrollToSection('top')}
                  className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                >
                  <ChevronUp size={16} className="inline mr-1" /> Back to Top
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 relative z-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <Link to="/" className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                <CircuitBoard className="text-cyan-500" size={20} />
                <span className="text-lg font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
              </Link>
              <p className="text-gray-400 text-sm">
                Pushing the boundaries of human potential through advanced cybernetic enhancements since {foundingYear}.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Neural Implants</Link></li>
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Sensory Enhancements</Link></li>
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Limb Replacements</Link></li>
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Organ Upgrades</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">About Us</Link></li>
                <li><Link to="/reviews" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Reviews</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><Link to='/termsOfService' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Warranty Info</a></li>
                <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Clinical Trials</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {currentYear} CyborgCorp. All rights reserved. Human/Machine Integration License #45291-B</p>
            <p className="mt-2">Designed with <Heart size={12} className="inline text-red-500" /> and Code</p>
          </div>
        </div>
      </footer>
    </div>
  );
}