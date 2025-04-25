import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Heart, Brain, Eye, Ear, Hand, BrainCog, Shield, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

// Generate grid cells first so that the site doesn't run at 1 fps
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

export default function NerdPage() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Current year calculation
  const currentYear = new Date().getFullYear();
  const foundingYear = currentYear - 7;

  // Tech section content
  const techSections = [
    {
      title: "Cybernetic Eyes",
      icon: Eye,
      content: `
        Our Cybernetic Eye modules redefine visual perception. Featuring adaptive optics and advanced spectral filters, users can perceive the full electromagnetic spectrum, from infrared to ultraviolet, opening up a new world of sensory input. 
        Equipped with a neural-linked ocular sensor array, our eyes provide unparalleled image resolution and dynamic range.
      `,
      content2: `
        Furthermore, our ocular implants feature cutting-edge quantum entanglement communication, enabling instantaneous data transmission and real-time visual overlays. These systems also provide automatic focus adjustment and advanced depth perception, surpassing the capabilities of organic eyes.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Bionic_eye",
      alignment: "left",
      bgClass: "bg-gradient-to-br from-cyan-900/50 to-purple-900/30",
      borderClass: "border-cyan-800/60",
      iconBgClass: "bg-cyan-950",
      iconClass: "text-cyan-400",
    },
    {
      title: "Bionic Ears",
      icon: Ear,
      content: `
        The Bionic Ear represents a breakthrough in auditory enhancement. Our auditory implants use nano-scale acoustic receptors that capture a broader frequency range than the human ear. 
        With our auditory processing algorithms, users can filter out unwanted noise, focus on specific sound sources, and even translate frequencies outside the normal human range.
      `,
      content2: `
        The enhanced model features directional sound focusing, allowing users to isolate specific conversations in crowded environments. In addition, it can receive and process sub-audible frequencies, offering a new dimension in auditory perception.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Hearing_aid",
      alignment: "right",
      bgClass: "bg-gradient-to-br from-blue-900/40 to-indigo-900/30",
      borderClass: "border-blue-800/60",
      iconBgClass: "bg-blue-950",
      iconClass: "text-blue-400",
    },
    {
      title: "Augmented Limbs",
      icon: Hand,
      content: `
        Our Augmented Limbs series offer unparalleled strength and dexterity. Constructed from a carbon-fiber alloy and powered by micro-hydraulic actuators, these limbs mimic organic movement while delivering tenfold increases in power. 
        Embedded sensors provide haptic feedback, giving users a sense of touch as precise as their original limbs.
      `,
      content2: `
        Advanced models incorporate neural pathway mapping, enabling users to control the limbs with intuitive thought. They also include adaptive strength calibration, ensuring they can perform delicate tasks with precision or engage in extreme activities safely.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Exoskeleton",
      alignment: "left",
      bgClass: "bg-gradient-to-br from-cyan-900/40 to-emerald-900/20",
      borderClass: "border-emerald-800/60",
      iconBgClass: "bg-emerald-950",
      iconClass: "text-emerald-400",
    },
    {
      title: "Neuralinks",
      icon: BrainCog,
      content: `
        Our Neuralinks are the pinnacle of human-machine interface technology. Using a biocompatible mesh woven at the nanoscale, the Neuralink creates a seamless connection between the user's brain and external digital systems. 
        This allows for direct control of digital devices with thought, instantaneous access to cloud-based information, and even sensory augmentation.
      `,
      content2: `
        In addition, our neural links use cognitive offloading to extend memory, and the synaptic plasticity augmentation allows for unparalleled brain learning.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Neuralink",
      alignment: "right",
      bgClass: "bg-gradient-to-br from-purple-900/40 to-violet-900/20",
      borderClass: "border-purple-800/60",
      iconBgClass: "bg-purple-950",
      iconClass: "text-purple-400",
    },
    {
      title: "Integrated Blood Analyzers",
      icon: Heart,
      content: `
        The Integrated Blood Analyzer is a revolutionary device that monitors your internal health in real time. Using nano-scale biosensors, it continuously samples and analyzes your blood chemistry. 
        This device can provide early warnings for a variety of health conditions, including infections, nutrient deficiencies, and even early-stage cancers.
      `,
      content2: `
        The device's ability to detect subtle changes in blood composition allows for personalized health monitoring. It can track key health indicators and provide insights into your body's response to diet, exercise, and environment, promoting proactive healthcare management.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Blood_test",
      alignment: "left",
      bgClass: "bg-gradient-to-br from-red-900/40 to-pink-900/20",
      borderClass: "border-red-800/60",
      iconBgClass: "bg-red-950",
      iconClass: "text-red-400",
    },
    {
      title: "Subdermal Displays",
      icon: CircuitBoard,
      content: `
        Our Subdermal Display technology allows for the seamless integration of information directly into your skin. These ultra-thin, flexible displays are embedded beneath the skin and can project a variety of information. 
        This includes notifications, health metrics, and even interactive interfaces, all visible beneath your skin.
      `,
      content2: `
        The displays use advanced LED technology, allowing them to be energy-efficient and long-lasting. They can be customized to show various types of information and can even be integrated with other devices, such as smartwatches and smartphones, for a truly interconnected experience.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Smart_tattoo",
      alignment: "right",
      bgClass: "bg-gradient-to-br from-amber-900/40 to-yellow-900/20",
      borderClass: "border-amber-800/60",
      iconBgClass: "bg-amber-950",
      iconClass: "text-amber-400",
    },
    {
      title: "Enhanced Immune Systems",
      icon: Shield,
      content: `
        Our Enhanced Immune System technology is designed to supercharge your body's natural defenses. By introducing genetically modified immune cells, we can enhance your body's ability to fight off infections. 
        These cells can identify and neutralize a wide range of pathogens, ensuring that your body is always ready to defend against viruses and bacteria.
      `,
      content2: `
        This technology not only protects against common infections but also offers long-term health benefits. It can prevent the development of certain diseases and allergies and promote overall vitality and well-being.
      `,
      wikiLink: "https://en.wikipedia.org/wiki/Immune_system",
      alignment: "left",
      bgClass: "bg-gradient-to-br from-teal-900/40 to-green-900/20",
      borderClass: "border-teal-800/60",
      iconBgClass: "bg-teal-950",
      iconClass: "text-teal-400",
    },
  ];

  // Cursor glow effect reused from homepage
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

      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-blue-900/20 to-transparent"></div>
          <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/10 to-transparent"></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-t from-teal-900/10 to-transparent"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-5 mix-blend-screen"></div>
      </div>

      {/* Navigation - Fixed to top */}
      <header className="sticky top-0 border-b border-gray-800 bg-black/90 backdrop-blur-sm w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logo} alt="CyborgCorp Logo" className="h-6 w-auto" />
            <span className="text-xl font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className={getNavLinkClass('/')}>Home</Link>
            <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
            <Link to="/reviews" className={getNavLinkClass('/reviews')}>Reviews</Link>
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
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <Link to="/" className={getMobileNavLinkClass('/')}>Home</Link>
              <Link to="/about" className={getMobileNavLinkClass('/about')}>About</Link>
              <Link to="/reviews" className={getMobileNavLinkClass('/reviews')}>Reviews</Link>
              <Link to="/contact" className={getMobileNavLinkClass('/contact')}>Contact</Link>
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Buy Now</Link>
            </div>
          </nav>
        )}
      </header>

      {/* Content */}
      <div className="flex-grow container mx-auto px-4 py-24 relative">
        <BackgroundGrid className="absolute inset-0" rows={20} cols={20} />
        
        <h1 className="text-4xl md:text-6xl font-bold text-center text-cyan-400 mb-12">
          The Future of Technology
        </h1>

        {/* Introduction Section */}
        <section className="relative bg-gradient-to-br from-blue-900/30 to-cyan-900/20 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-blue-800/40 shadow-lg shadow-cyan-900/20 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="p-6 bg-blue-950 rounded-xl border border-cyan-600 shadow-lg shadow-cyan-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                <Zap size={96} className="text-cyan-400 relative z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-cyan-300">Redefining Human Potential</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Welcome to CyborgCorp's cutting-edge technology showcase, where the boundaries between human and machine blur into a new frontier of possibility. Our revolutionary cybernetic enhancements aren't just products—they're gateways to an elevated existence.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Each of our innovations is meticulously engineered to integrate seamlessly with human biology, enhancing natural capabilities while introducing entirely new dimensions of perception and interaction with the world around you.
                </p>
                <p className="text-gray-300 leading-relaxed">
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

        {/* Nerd Tech Sections with alternating layouts */}
        <div className="space-y-16">
          {techSections.map((section, index) => (
            <section 
              key={index} 
              className={`relative ${section.bgClass} p-8 rounded-lg backdrop-blur-sm border ${section.borderClass} shadow-lg shadow-cyan-900/20`}
            >
              {section.alignment === 'left' ? (
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-1/4 flex justify-center">
                    <div className={`p-6 ${section.iconBgClass} rounded-xl border ${section.borderClass} shadow-lg shadow-cyan-600/20 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                      <section.icon size={64} className={section.iconClass} />
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h2 className="text-3xl font-semibold mb-6 text-cyan-300">{section.title}</h2>
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                      <p className="text-gray-300 leading-relaxed">{section.content2}</p>
                      <a
                        href={section.wikiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        Learn More <ChevronRight size={16} className="inline" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row-reverse items-start gap-8">
                  <div className="md:w-1/4 flex justify-center">
                    <div className={`p-6 ${section.iconBgClass} rounded-xl border ${section.borderClass} shadow-lg shadow-cyan-600/20 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"></div>
                      <section.icon size={64} className={section.iconClass} />
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-400/10 to-transparent"></div>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h2 className="text-3xl font-semibold mb-6 text-cyan-300">{section.title}</h2>
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                      <p className="text-gray-300 leading-relaxed">{section.content2}</p>
                      <a
                        href={section.wikiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        Learn More <ChevronRight size={16} className="inline" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Footer - Sticks to bottom */}
      <footer className="bg-black border-t border-gray-800 py-8 relative z-10 mt-auto">
        <div className="container mx-auto px-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
}