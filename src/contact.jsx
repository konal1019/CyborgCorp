import React, { useState, useEffect, useRef } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Smartphone, Phone, Menu, X, CircuitBoard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

// Background grid component reused from homepage
const BackgroundGrid = ({ rows = 8, cols = 8, className = "" }) => {
  const cells = Array.from({ length: rows * cols }).map((_, i) => (
    <div key={i} className="border-t border-l border-gray-800"></div>
  ));

  return (
    <div className={`grid ${cols <= 12 ? `grid-cols-${cols}` : 'grid-cols-12'} ${rows <= 12 ? `grid-rows-${rows}` : 'grid-rows-12'} h-full w-full ${className}`}>
      {cells}
    </div>
  );
};

function Contact() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cursor glow effect from about page
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setName('');
    setContactInfo('');
    setMessage('');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Current year calculation for footer
  const currentYear = new Date().getFullYear();
  const foundingYear = currentYear - 7;

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
            <img src={logo} alt="CyborgCorp Logo" className="h-6 w-auto" />
            <span className="text-xl font-bold tracking-tight">CYBORG<span className="text-cyan-500">CORP</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Home</Link>
            <Link to="/about" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">About</Link>
            <Link to="/reviews" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Reviews</Link>
            <Link to="/nerd" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</Link>
            <Link to="/contact" className="text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/*  CTA Button container */}
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
              <Link to="/about" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">About</Link>
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Reviews</Link>
              <Link to="/contact" className="text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
              <Link to="/nerd" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Buy Now</Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid />
        </div>

        {/* Contact header */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative mb-12">
            <h1 className="text-4xl font-bold text-center mb-4">Contact <span className="text-cyan-500">Us</span></h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Ready to transcend human limitations? Get in touch with our team of cybernetic specialists.
            </p>
          </div>

          {/* Main Form */}
          <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-sm border border-gray-800 p-8 rounded-lg shadow-lg mb-12 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold mb-3 text-center">Get in Touch</h2>
            
            {/* Notice */}
            <div className="bg-cyan-900/30 border border-cyan-700 text-cyan-100 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Important Notice:</strong>
              <span className="block sm:inline"> Please provide accurate contact information. Messages with invalid or incomplete data will not receive a response.</span>
            </div>
            
            {/* Alert */}
            {showAlert && (
              <div className="bg-cyan-900/30 border border-cyan-500 text-cyan-100 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Your message has been sent.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-cyan-100">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactInfo" className="block mb-2 text-cyan-100">Contact Info:</label>
                <input
                  type="text"
                  id="contactInfo"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Email address or phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-cyan-100">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  rows="5"
                  placeholder="Tell us about your enhancement interests or questions"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-black font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Conventional Media Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Prefer conventional media? <span className="text-cyan-500">Got you covered</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm border border-gray-800 p-4 rounded-lg hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <Mail className="text-cyan-400" size={28} />
                <div>
                  <p className="font-semibold text-cyan-100">Email:</p>
                  <a href="mailto:info@example.com" className="text-blue-400 hover:underline">info@cyborgcorp.com</a>
                </div>
              </div>
              {/* Mobile */}
              <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm border border-gray-800 p-4 rounded-lg hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <Smartphone className="text-cyan-400" size={28} />
                <div>
                  <p className="font-semibold text-cyan-100">Mobile:</p>
                  <p>+1-123-456-7890</p>
                </div>
              </div>
              {/* Telephone */}
              <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm border border-gray-800 p-4 rounded-lg hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <Phone className="text-cyan-400" size={28} />
                <div>
                  <p className="font-semibold text-cyan-100">Telephone:</p>
                  <p>+1-987-654-3210</p>
                </div>
              </div>
              {/* Social Media */}
              <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm border border-gray-800 p-4 rounded-lg hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/cyborgcorp" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    <Facebook size={28} />
                  </a>
                  <a href="https://www.instagram.com/cyborgcorp/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                    <Instagram size={28} />
                  </a>
                  <a href="https://twitter.com/cyborgcorp" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <Twitter size={28} />
                  </a>
                  <a href="https://www.linkedin.com/company/cyborgcorp/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 relative z-10">
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

export default Contact;