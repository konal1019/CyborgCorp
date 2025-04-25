import { useState, useEffect, useRef, useMemo} from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Shield, FileCheck, AlertTriangle, HelpCircle, Scale, Phone, Mail, Smartphone, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from './logo.png';
import { Link, useLocation } from 'react-router-dom';

// create bg grid first to avoid lag
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

export default function TermsOfService() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // cursor glow effect 
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

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 7;

  const tosCategories = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <FileCheck className="text-cyan-500" size={28} />,
      content: "By accessing and using CyborgCorp's products, services, website, and mobile applications, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services or purchase our products."
    },
    {
      id: "eligibility",
      title: "Eligibility & Requirements",
      icon: <Scale className="text-cyan-500" size={28} />,
      content: "You must be at least 18 years of age to purchase and use our cybernetic enhancement products. Certain products may require medical pre-screening and approval from a CyborgCorp-certified physician. You are responsible for ensuring you meet all medical prerequisites before installation. Documented proof of compatibility testing is required for neural-integrated products."
    },
    {
      id: "products",
      title: "Products & Services",
      icon: <CircuitBoard className="text-cyan-500" size={28} />,
      content: "CyborgCorp provides premium-grade cybernetic enhancements designed for human augmentation. Each product comes with specific usage instructions and limitations. Unauthorized modification of any CyborgCorp enhancement is strictly prohibited and voids all warranties and liability protections. Regular maintenance at authorized CyborgCorp centers is required to maintain warranty coverage."
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <AlertTriangle className="text-cyan-500" size={28} />,
      content: "CyborgCorp is not liable for any mental, physical, or emotional changes that may occur as a result of cybernetic integration. By purchasing our products, you acknowledge the inherent risks associated with human augmentation technology. Integration synergy varies by individual. Our maximum liability for any claim arising from product use is limited to the original purchase price of the product."
    },
    {
      id: "privacy",
      title: "Privacy & Data",
      icon: <Shield className="text-cyan-500" size={28} />,
      content: "Your cybernetic enhancements may collect usage data to improve functionality and performance. This data is encrypted and transmitted to CyborgCorp's secure servers. You retain ownership rights to your personal biological data, but grant CyborgCorp a license to analyze anonymized performance metrics. You can adjust data sharing settings through your personal Neural Dashboard."
    },
    {
      id: "warranty",
      title: "Warranty Information",
      icon: <HelpCircle className="text-cyan-500" size={28} />,
      content: "All CyborgCorp products include a standard 3-year limited warranty covering manufacturing defects and integration failure. Extended warranty options are available at additional cost. Warranty coverage requires compliance with maintenance schedules and approved usage guidelines. Unauthorized repairs or modifications void all warranty protections. Biological rejection incidents are covered only when all pre-screening protocols were properly followed."
    }
  ];

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
            <Link to="/marketplace" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Products</Link>
            <Link to="/technology" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</Link>
            <Link to="/reviews" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Testimonials</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>  

          {/*  CTA Button container */}
          <div className="hidden md:flex gap-4">
            <Link to='/marketplace' className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-900 border-t border-gray-800 py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <Link to="/" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Home</Link>
              <Link to="/marketplace" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Products</Link>
              <Link to="/technology" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Testimonials</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
            </div> 
          </nav>
        )}
      </header>

      {/* Terms of Service Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="bg-cyan-500/20 p-4 rounded-full mb-6">
              <Shield className="text-cyan-500 w-10 h-10 md:w-12 md:h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of <span className="text-cyan-500">Service</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              These terms govern your use of CyborgCorp's products, services, and digital platforms. 
              Our cybernetic enhancements represent cutting-edge technology requiring mutual understanding of responsibilities.
            </p>
            <div className="text-sm text-gray-500">
              Last Updated: April 15, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 bg-gray-950/50 backdrop-blur-sm border-y border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {tosCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer px-3 py-1 hover:bg-cyan-500/10 rounded-full" 
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Terms Content */}
      <section className="py-12 relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <BackgroundGrid rows={20} cols={20} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-16">
            {tosCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                </div>
                <div className="pl-4 border-l-2 border-gray-800 space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {category.content}
                  </p>
                  {category.id === "acceptance" && (
                    <div className="mt-4 bg-cyan-900/20 border border-cyan-900/30 rounded-lg p-4">
                      <p className="text-cyan-100 text-sm">
                        By creating an account, placing an order, or using our website, you expressly acknowledge your acceptance of these terms in their entirety.
                      </p>
                    </div>
                  )}
                  {category.id === "products" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Enhancement Categories</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Neural Implants:</span> Products interfacing directly with your nervous system require specialized installation and additional safety agreements.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Sensory Enhancements:</span> Visual, auditory, and tactile augmentations require adaptation periods and follow-up calibration appointments.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Physical Enhancements:</span> Strength, speed, and endurance modifications come with specific usage limitations and safety protocols.</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {category.id === "privacy" && (
                    <div className="mt-4 bg-gray-900/70 rounded-lg p-4">
                      <h3 className="font-semibold text-cyan-400 mb-3">Data Collection Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                          <h4 className="font-medium text-white mb-1">Performance Data</h4>
                          <p className="text-gray-400">Usage patterns, system performance, and optimization metrics</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                          <h4 className="font-medium text-white mb-1">Biometric Feedback</h4>
                          <p className="text-gray-400">Integration metrics and biological response information</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                          <h4 className="font-medium text-white mb-1">Environmental Data</h4>
                          <p className="text-gray-400">External conditions affecting enhancement functionality</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                          <h4 className="font-medium text-white mb-1">Usage Statistics</h4>
                          <p className="text-gray-400">Feature utilization and access patterns</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {category.id === "warranty" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Warranty Exclusions</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span>Damage resulting from exceeding recommended usage parameters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span>Damage caused by unauthorized modifications or repairs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span>Failure to attend scheduled maintenance appointments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span>Natural wear and biological adaptation complications</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Additional Terms */}
            <div id="additional" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-4">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <FileCheck className="text-cyan-500" size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Additional Terms</h2>
              </div>
              <div className="pl-4 border-l-2 border-gray-800 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  CyborgCorp reserves the right to modify these Terms of Service at any time. Significant changes will be communicated through your Neural Dashboard notifications or registered contact methods. Continued use of our products and services after such modifications constitutes your acceptance of the updated terms.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  These terms are governed by the laws of the jurisdiction in which CyborgCorp's primary operations are located. Any disputes arising from these terms shall be resolved through arbitration in accordance with our Dispute Resolution Protocol.
                </p>
                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-white text-center">
                    For questions about these terms, please contact our Legal Enhancement Division at <span className="text-cyan-400">legal@cyborgcorp.tech</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gray-950 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-cyan-900/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-cyan-900/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to <span className="text-cyan-500">Evolve</span>?</h2>
            <p className="text-gray-400 mb-8">
              Now that you understand our terms, take the next step toward enhanced human potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 text-center">
                Explore Products
              </Link>
              <Link to="/" className="border border-cyan-500 hover:bg-cyan-500/10 text-cyan-500 px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 text-center">
                Contact Sales
              </Link>
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
                Pushing the boundaries of human potential through advanced cybernetic enhancements since {startYear}.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Neural Implants</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Sensory Enhancements</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Limb Replacements</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Organ Upgrades</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">About Us</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Testimonials</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</Link></li>
                <li><Link to="/termsOfService" className="text-cyan-400 transition-colors cursor-pointer">Terms of Service</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Warranty Info</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Clinical Trials</Link></li>
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