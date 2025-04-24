import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Heart, Brain, Eye, Cpu, Phone, Mail, Smartphone, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from './logo.png';
import { Link } from 'react-router-dom';

// generate grid cells first so that the site doesn't run at 1 fps
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

export default function CyborgCorpHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // cursor glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMoving.current) {
        isMoving.current = true;
    
        // trying to not make it trash
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${e.clientX - 128}px, ${e.clientY - 128}px)`;
          }
          
          clearTimeout(cursorTimeout.current);
          cursorTimeout.current = setTimeout(() => {
            isMoving.current = false;
          }, 20); // Limit to 50 updates per second so that the client doesn't crash
        });
      }
    };

    // claude said passive listener will give better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(cursorTimeout.current);
    };
  }, []);

  // Current year calculation
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 7;

  // totally real and not AI generated testimonials
  const testimonials = useMemo(() => [
    {
      quote: "The NeuroBridge Pro has truly changed my life. I feel more connected and in control than ever before.",
      customer: "Alex Johnson",
      rating: 5
    },
    {
      quote: "I can see things I never thought possible with the Ocular X-9000. It's like having superpowers!",
      customer: "Sarah Miller",
      rating: 5
    },
    {
      quote: "The CardioCore 7 gives me the confidence and stamina to push my limits every day. Highly recommended!",
      customer: "David Lee",
      rating: 5
    }
  ], []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* cursor effect */}
      <div
        ref={cursorRef}
        className="fixed w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none z-10 opacity-50"
        style={{
          willChange: 'transform', // Hint for browser optimization totally was my idea
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
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        <img src={logo} alt="CyborgCorp Logo" className="h-6 w-auto" />
        <span className="text-xl font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
      </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a onClick={() => scrollToSection("hero")} className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Home</a>
          <a onClick={() => scrollToSection("products")} className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Products</a>
          <a onClick={() => scrollToSection("technology")} className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</a>
          <a onClick={() => scrollToSection("testimonials")} className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Testimonials</a>
          <a onClick={() => scrollToSection("contact")} className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</a>
        </nav>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}\
        </button>

        {/*  CTA Button container */}
        <div className="hidden md:flex gap-4">
          <a onClick={() => scrollToSection("contact")} className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
            Upgrade Now
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <a onClick={() => scrollToSection("hero")} className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Home</a>
            <a onClick={() => scrollToSection("products")} className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Products</a>
            <a onClick={() => scrollToSection("technology")} className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</a>
            <a onClick={() => scrollToSection("testimonials")} className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Testimonials</a>
            <a onClick={() => scrollToSection("contact")} className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</a>
          </div>
        </nav>
      )}
    </header>


    {/* Hero Section */}
    <section id="hero" className="pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <BackgroundGrid />
      </div>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-no-repeat bg-cover bg-left"
            style={{ backgroundImage: "var(--background-image)" }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-cyan-500">Evolve</span> Beyond Human Limitations
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Premium-grade cybernetic enhancements designed for the human of tomorrow. Upgrade your body, upgrade your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a onClick={() => scrollToSection("products")} className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 text-center">
                Explore Products
              </a>
              <a onClick={() => scrollToSection("technology")} className="border border-cyan-500 hover:bg-cyan-500/10 text-cyan-500 px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 text-center">
                Our Technology
              </a>
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
                  <Eye className="text-cyan-400 w-16 h-16 md:w-24 md:h-24 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section id="products" className="py-12 md:py-20 bg-gray-950 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-cyan-500">Enhancements</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our cutting-edge cybernetic implants and body parts are designed for seamless integration with your organic systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="bg-black border border-gray-800 rounded-lg overflow-hidden group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
            <div className="h-48 bg-gray-900 flex items-center justify-center p-6 group-hover:bg-gray-900/80 transition-colors">
              <Eye className="text-cyan-500 w-24 h-24 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">Ocular X-9000</h3>
              <p className="text-gray-400 mb-4">Enhanced vision with night vision, zoom capabilities, and augmented reality overlay.</p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-500 font-semibold">$14,999</span>
                <a className="flex items-center text-sm hover:text-cyan-400 transition-colors group-hover:translate-x-1 transition-transform cursor-pointer">
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-black border border-gray-800 rounded-lg overflow-hidden group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
            <div className="h-48 bg-gray-900 flex items-center justify-center p-6 group-hover:bg-gray-900/80 transition-colors">
              <Heart className="text-cyan-500 w-24 h-24 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">CardioCore 7</h3>
              <p className="text-gray-400 mb-4">Military-grade heart replacement with 200% efficiency and remote monitoring.</p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-500 font-semibold">$29,999</span>
                <a className="flex items-center text-sm hover:text-cyan-400 transition-colors group-hover:translate-x-1 transition-transform cursor-pointer">
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-black border border-gray-800 rounded-lg overflow-hidden group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
            <div className="h-48 bg-gray-900 flex items-center justify-center p-6 group-hover:bg-gray-900/80 transition-colors">
              <Brain className="text-cyan-500 w-24 h-24 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">NeuroBridge Pro</h3>
              <p className="text-gray-400 mb-4">Neural enhancement chip for improved cognition, memory, and wireless connectivity.</p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-500 font-semibold">$42,999</span>
                <a className="flex items-center text-sm hover:text-cyan-400 transition-colors group-hover:translate-x-1 transition-transform cursor-pointer">
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a className="inline-flex items-center bg-transparent border border-cyan-500 hover:bg-cyan-500/10 text-cyan-500 px-6 py-3 rounded font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
            View All Products <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>

    {/* Technology Section */}
    <section id="technology" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <BackgroundGrid rows={12} cols={12} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="text-cyan-500">Revolutionary</span> Technology</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our proprietary integration systems ensure seamless compatibility between organic tissue and cybernetic enhancements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8 hover:translate-x-2 transition-transform cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500/20 p-2 rounded group-hover:bg-cyan-500/30 transition-colors">
                  <Cpu className="text-cyan-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">Adaptive Integration</h3>
              </div>
              <p className="text-gray-400 pl-12">
                Our proprietary neural interface system allows for seamless connection between your body and cybernetic enhancements.
              </p>
            </div>

            <div className="mb-8 hover:translate-x-2 transition-transform cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500/20 p-2 rounded group-hover:bg-cyan-500/30 transition-colors">
                  <Brain className="text-cyan-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">NeuroBridge Technology</h3>
              </div>
              <p className="text-gray-400 pl-12">
                Advanced neural pathway mapping creates a direct interface between human consciousness and digital systems, enabling unprecedented control.
              </p>
            </div>

            <div className="mb-8 hover:translate-x-2 transition-transform cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500/20 p-2 rounded group-hover:bg-cyan-500/30 transition-colors">
                  <CircuitBoard className="text-cyan-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">Self-Healing Circuitry</h3>
              </div>
              <p className="text-gray-400 pl-12">
                Military-grade materials with regenerative capabilities ensure longevity and durability of all implants.
              </p>
            </div>

            <div className="hover:translate-x-2 transition-transform cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500/20 p-2 rounded group-hover:bg-cyan-500/30 transition-colors">
                  <Heart className="text-cyan-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">Bio-Compatible Materials</h3>
              </div>
              <p className="text-gray-400 pl-12">
                All products are made with hypoallergenic, non-reactive materials that sync perfectly with organic tissue.
              </p>
            </div>
          </div>

          <div className="relative cursor-pointer group">
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/50 to-transparent"></div>
              <div className="w-32 h-32 md:w-48 md:h-48 relative bottom-8 animate-pulse z-10 group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500"></div>
                <div className="absolute inset-4 rounded-full border border-cyan-400"></div>
                <div className="absolute inset-8 rounded-full border border-cyan-400/50"></div>
                <div className="absolute inset-12 rounded-full border border-cyan-400/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="text-cyan-400 w-12 h-12 md:w-16 md:h-16" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded text-sm text-gray-300 group-hover:bg-black/80 transition-colors">
                NeuroBridge™ Technology seamlessly connects with your neural pathways for enhanced control and feedback.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section id="testimonials" className="py-12 md:py-20 relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 z-0 opacity-20">
        <BackgroundGrid rows={10} cols={10} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client <span className="text-cyan-500">Testimonials</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear what our enhanced clients have to say about their cybernetic experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 p-6 rounded-lg relative group hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-cyan-500 text-black rounded-full p-2 flex items-center justify-center w-10 h-10 shadow-lg">
                <span className="font-bold">{testimonial.rating}</span>
              </div>

              <div className="text-cyan-500 text-4xl font-bold mb-4">"</div>

              <p className="text-gray-300 mb-6 italic">
                {testimonial.quote}
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold">
                  {testimonial.customer.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white">{testimonial.customer}</p>
                  <p className="text-xs text-gray-400">Verified Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-12 md:py-16 bg-cyan-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-cyan-800/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-cyan-800/30 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-cyan-100">
            Get in touch with our experts for consultations and upgrades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center hover:bg-black/40 transition-colors cursor-pointer group">
            <div className="bg-cyan-500/20 p-3 rounded-full mb-3 group-hover:bg-cyan-500/30 transition-colors">
              <Phone className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-medium mb-2">Phone</h3>
            <p className="text-cyan-100 text-sm">+1 (800) CYBORG-1</p>
          </div>

          {/* Mobile */}
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center hover:bg-black/40 transition-colors cursor-pointer group">
            <div className="bg-cyan-500/20 p-3 rounded-full mb-3 group-hover:bg-cyan-500/30 transition-colors">
              <Smartphone className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-medium mb-2">Mobile</h3>
            <p className="text-cyan-100 text-sm">+1 (888) UPGRADE</p>
          </div>

          {/* Email */}
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center hover:bg-black/40 transition-colors cursor-pointer group">
            <div className="bg-cyan-500/20 p-3 rounded-full mb-3 group-hover:bg-cyan-500/30 transition-colors">
              <Mail className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-medium mb-2">Email</h3>
            <p className="text-cyan-100 text-sm">info@cyborgcorp.tech</p>
          </div>

          {/* Social Media */}
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center hover:bg-black/40 transition-colors cursor-pointer group">
            <div className="bg-cyan-500/20 p-3 rounded-full mb-3 group-hover:bg-cyan-500/30 transition-colors">
              <CircuitBoard className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-medium mb-2">Social Media</h3>
            <div className="flex gap-3 mt-1">
              <a className="text-cyan-100 hover:text-cyan-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a className="text-cyan-100 hover:text-cyan-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a className="text-cyan-100 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a className="text-cyan-100 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>


    {/* Footer - Positioned relative to ensure visibility */}
    <footer className="bg-black border-t border-gray-800 py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              <CircuitBoard className="text-cyan-500" size={20} />
              <span className="text-lg font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Pushing the boundaries of human potential through advanced cybernetic enhancements since {startYear}.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a onClick={() => scrollToSection("products")} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Neural Implants</a></li>
              <li><a onClick={() => scrollToSection("products")} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Sensory Enhancements</a></li>
              <li><a onClick={() => scrollToSection("products")} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Limb Replacements</a></li>
              <li><a onClick={() => scrollToSection("products")} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Organ Upgrades</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">About Us</Link></li>
              <li><a href="#testimonials" onClick={() => scrollToSection("testimonials")} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Testimonials</a></li>
              <li><a href="#contact" onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Contact</a></li>
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