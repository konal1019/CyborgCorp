import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, ShoppingCart, AlertCircle, Frown, Github, Instagram, Code, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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

export default function BuyPage() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);

  // Fixed scroll functionality
  useEffect(() => {
    // This function will be called when the component mounts and when location changes
    const scrollToSection = () => {
      if (location.search.includes('section=')) {
        // Extract section ID from query string
        const sectionId = new URLSearchParams(location.search).get('section');
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            return; // Exit early if we found and scrolled to a section
          }
        }
      }
      
      // If no section parameter or section not found, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Call the function
    scrollToSection();
  }, [location]); 

  // Current year calculation
  const currentYear = new Date().getFullYear();

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

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* cursor effect */}
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
            <CircuitBoard className="text-cyan-500" size={20} />
            <span className="text-xl font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Home</Link>
            <Link to="/about" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">About</Link>
            <Link to="/reviews" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Reviews</Link>
            <Link to="/nerd" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-4 items-center">
            <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
              Back to Marketplace
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-900 border-t border-gray-800 py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <Link to="/" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Home</Link>
              <Link to="/about" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">About</Link>
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Reviews</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
              <Link to="/nerd" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/marketplace" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Marketplace</Link>
            </div>
          </nav>
        )}
      </header>

      {/* Empty Cart Section */}
      <section className="pt-32 pb-16 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid rows={12} cols={12} />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <ShoppingCart className="text-cyan-500/30 w-32 h-32" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Frown className="text-cyan-500 w-16 h-16" />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 glitch-text">
                <span className="text-red-500">ERROR</span>: <span className="text-cyan-500">ACCESS DENIED</span>
              </h1>
              
              <div className="border border-red-500 bg-red-900/20 px-6 py-4 rounded-lg mb-6 max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-cyan-500 animate-pulse"></div>
                <AlertCircle className="text-red-500 w-6 h-6 mx-auto mb-2" />
                <p className="text-red-200 mb-2 font-medium">CYBERNETIC COMMERCE RESTRICTION</p>
                <p className="text-gray-300">The CyborgCorp purchasing system is not available in your geographic region due to local regulations on human enhancement technology.</p>
              </div>
              
              <div className="text-gray-400 space-y-4 mb-8">
                <p>Our systems have detected that your current location is under jurisdiction that restricts the purchase of advanced cybernetic enhancements without proper medical authorization.</p>
                <p>We apologize for the inconvenience, but we are required to comply with all local and international laws regarding the distribution of human-machine integration technology.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 flex items-center justify-center gap-2">
                <ChevronRight className="w-4 h-4" />
                <span>Return to Marketplace</span>
              </Link>
              <Link to="/contact" className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 px-6 py-3 rounded font-medium transition-all cursor-pointer">
                Request Regional Access
              </Link>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="mt-16 border-t border-gray-800 pt-8">
            <h3 className="text-center text-xl font-medium mb-6">Meanwhile, connect with our founder and lead engineer:</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://github.com/konal1019/CyborgCorp" target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 border border-gray-800 hover:border-cyan-500 px-4 py-3 rounded-lg flex items-center gap-2 transition-all group">
                <Github className="text-cyan-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">GitHub Repository</span>
              </a>
              <a href="https://instagram.com/4quafl4r3" target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 border border-gray-800 hover:border-cyan-500 px-4 py-3 rounded-lg flex items-center gap-2 transition-all group">
                <Instagram className="text-cyan-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">4quafl4r3</span>
              </a>
              <a href="https://leetcode.com/4qua__/" target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 border border-gray-800 hover:border-cyan-500 px-4 py-3 rounded-lg flex items-center gap-2 transition-all group">
                <Code className="text-cyan-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">LeetCode: 4qua__</span>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 border border-gray-800 hover:border-cyan-500 px-4 py-3 rounded-lg flex items-center gap-2 transition-all group">
                <Code className="text-cyan-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Discord: 4qua_fl4r3</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                <CircuitBoard className="text-cyan-500" size={20} />
                <span className="text-lg font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Pushing the boundaries of human potential through advanced cybernetic enhancements.
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
                <li><Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">About Us</Link></li>
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