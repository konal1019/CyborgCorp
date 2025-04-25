import { useState, useEffect, useRef, useMemo} from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Shield, FileCheck, AlertTriangle, HelpCircle, Scale, Database, Lock, Eye, Trash2, Layers, Download, UserPlus } from 'lucide-react';
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

export default function PrivacyPolicy() {
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

  const privacyCategories = [
    {
      id: "information",
      title: "Information We Collect",
      icon: <Database className="text-cyan-500" size={28} />,
      content: "CyborgCorp collects only the necessary data to ensure your cybernetic enhancements function optimally and safely. We separate this data into essential and optional categories, with essential data being required for basic functionality and safety. Optional data collection can be disabled at any time through your Neural Dashboard preferences."
    },
    {
      id: "control",
      title: "Your Data Control",
      icon: <Lock className="text-cyan-500" size={28} />,
      content: "You maintain primary control over your personal and enhancement data at all times. Through your Neural Dashboard, you can view, edit, delete, or restrict the sharing of any non-essential data collected by your enhancements. Essential safety and functionality data cannot be fully deleted while your enhancements are active, but access to this data is strictly limited to necessary service operations."
    },
    {
      id: "usage",
      title: "How We Use Your Data",
      icon: <Layers className="text-cyan-500" size={28} />,
      content: "CyborgCorp uses collected data primarily to ensure your enhancements function correctly and safely. Secondary uses include product improvement, troubleshooting, and customizing your experience. We do not sell your data to third parties or use it for unsolicited marketing purposes. Any feature utilizing your data will clearly inform you during setup or activation."
    },
    {
      id: "sharing",
      title: "Data Sharing Practices",
      icon: <Eye className="text-cyan-500" size={28} />,
      content: "We share your data only with your explicit consent or when required to provide the services you've requested. This may include authorized medical providers, maintenance specialists, or emergency services when necessary for your safety. All third-party sharing is conducted under strict contractual obligations that maintain the same level of protection as our internal policies."
    },
    {
      id: "security",
      title: "Data Security",
      icon: <Shield className="text-cyan-500" size={28} />,
      content: "All data collected from your cybernetic enhancements is protected using industry-leading encryption both during transmission and storage. Our security protocols undergo regular independent auditing and updates. We implement neural-level authentication for accessing sensitive information and maintain isolated network architecture to prevent unauthorized access."
    },
    {
      id: "rights",
      title: "Your Privacy Rights",
      icon: <UserPlus className="text-cyan-500" size={28} />,
      content: "As a CyborgCorp customer, you have specific rights regarding your data including access, correction, deletion, portability, and the right to restrict processing. These rights can be exercised through your Neural Dashboard or by contacting our Privacy Enhancement Team. We process all privacy requests within 30 days and provide confirmation of actions taken."
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
            <Link to="/about" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">About</Link>
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
              <Link to="/about" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">about</Link>
              <Link to="/technology" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Testimonials</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
              <Link to="/marketplace" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Products</Link>
            </div> 
          </nav>
        )}
      </header>

      {/* Privacy Policy Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="bg-cyan-500/20 p-4 rounded-full mb-6">
              <Lock className="text-cyan-500 w-10 h-10 md:w-12 md:h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="text-cyan-500">Policy</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              At CyborgCorp, we believe your data belongs to you. This policy explains how we collect, 
              use, and protect information related to your cybernetic enhancements.
            </p>
            <div className="text-sm text-gray-500">
              Last Updated: April 18, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 bg-gray-950/50 backdrop-blur-sm border-y border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {privacyCategories.map((category) => (
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

      {/* Main Privacy Content */}
      <section className="py-12 relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <BackgroundGrid rows={20} cols={20} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-16">
            {privacyCategories.map((category) => (
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
                  {category.id === "information" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Data Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Shield size={16} className="text-cyan-500" /> Essential Data
                          </h4>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>System diagnostics and operational status</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Basic integration metrics with host biology</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Critical error logs and safety notifications</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Enhancement calibration settings</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Eye size={16} className="text-cyan-500" /> Optional Data
                          </h4>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Usage patterns and feature utilization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Environmental interaction data</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Performance optimization metrics</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Enhancement personalization preferences</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-cyan-900/20 border border-cyan-900/30 rounded-lg p-4 mt-4">
                        <p className="text-cyan-100 text-sm">
                          All optional data collection can be disabled through your Neural Dashboard with no penalty to basic functionality. Only critical safety and operational data remains essential.
                        </p>
                      </div>
                    </div>
                  )}
                  {category.id === "control" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Your Control Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex items-start gap-3">
                          <Eye className="text-cyan-500 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h4 className="font-medium text-white mb-1">View Your Data</h4>
                            <p className="text-gray-400">Access complete logs of all data collected by your enhancements through your Neural Dashboard</p>
                          </div>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex items-start gap-3">
                          <Download className="text-cyan-500 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h4 className="font-medium text-white mb-1">Export Your Data</h4>
                            <p className="text-gray-400">Download your complete dataset in multiple formats for personal records or transfer</p>
                          </div>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex items-start gap-3">
                          <Trash2 className="text-cyan-500 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h4 className="font-medium text-white mb-1">Delete Optional Data</h4>
                            <p className="text-gray-400">Permanently remove any non-essential data from our systems with one-click purge options</p>
                          </div>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex items-start gap-3">
                          <Lock className="text-cyan-500 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h4 className="font-medium text-white mb-1">Restrict Data Sharing</h4>
                            <p className="text-gray-400">Granular control over which data points can be shared and with whom</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {category.id === "usage" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Primary Data Uses</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Performance Optimization:</span> Adjusting your enhancements to function optimally based on your unique biology and usage patterns.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Safety Monitoring:</span> Identifying potential integration issues or maintenance needs before they become problems.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Enhancement Updates:</span> Developing firmware and software improvements based on anonymized usage data.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Service Provision:</span> Enabling authorized maintenance technicians to diagnose and repair issues efficiently.</span>
                        </li>
                      </ul>
                      <div className="bg-gray-900/70 rounded-lg p-4 mt-2">
                        <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                          <AlertTriangle size={16} className="text-cyan-500" /> What We Don't Do With Your Data
                        </h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                            <span>Sell or rent your personal data to third parties</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                            <span>Create behavior profiles for advertising purposes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                            <span>Use neural pattern data for experimental research without explicit consent</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                            <span>Access sensory data feeds without emergency justification</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {category.id === "sharing" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Limited Sharing Circumstances</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Maintenance Providers:</span> Certified CyborgCorp technicians may access diagnostic data during authorized maintenance procedures.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Medical Professionals:</span> Your authorized healthcare providers can receive integration metrics when granted access through your Neural Dashboard.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Emergency Services:</span> Critical safety data may be shared with emergency responders in life-threatening situations.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                          <span><span className="font-medium text-white">Legal Requirements:</span> We comply with valid legal orders while contesting overly broad requests and notifying users when permitted.</span>
                        </li>
                      </ul>
                      <div className="bg-cyan-900/20 border border-cyan-900/30 rounded-lg p-4 mt-4">
                        <p className="text-cyan-100 text-sm">
                          You can view a complete log of all third-party data access events through your Neural Dashboard under "Access History." Any sharing of optional data requires explicit opt-in consent that can be revoked at any time.
                        </p>
                      </div>
                    </div>
                  )}
                  {category.id === "security" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Security Measures</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Shield size={16} className="text-cyan-500" /> Technical Protections
                          </h4>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Quantum-resistant encryption for all stored data</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Neural-signature authentication systems</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Isolated enhancement firmware architecture</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Continuous security monitoring and updates</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Lock size={16} className="text-cyan-500" /> Administrative Safeguards
                          </h4>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Regular independent security audits</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Employee security training and access controls</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Multi-factor physical access restrictions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="text-cyan-500 mt-1 flex-shrink-0" size={14} />
                              <span>Breach notification protocols</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-4">
                        In the unlikely event of a security breach affecting your personal data, we will notify you within 72 hours with details about the breach, what data was affected, and steps we're taking to address the situation.
                      </p>
                    </div>
                  )}
                  {category.id === "rights" && (
                    <div className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold text-cyan-400">Your Rights Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex flex-col items-center text-center">
                          <Eye className="text-cyan-500 mb-2" size={22} />
                          <h4 className="font-medium text-white mb-1">Right to Access</h4>
                          <p className="text-gray-400">View all data collected about you</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex flex-col items-center text-center">
                          <FileCheck className="text-cyan-500 mb-2" size={22} />
                          <h4 className="font-medium text-white mb-1">Right to Correction</h4>
                          <p className="text-gray-400">Update inaccurate information</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex flex-col items-center text-center">
                          <Trash2 className="text-cyan-500 mb-2" size={22} />
                          <h4 className="font-medium text-white mb-1">Right to Deletion</h4>
                          <p className="text-gray-400">Remove optional data completely</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex flex-col items-center text-center">
                          <Download className="text-cyan-500 mb-2" size={22} />
                          <h4 className="font-medium text-white mb-1">Right to Portability</h4>
                          <p className="text-gray-400">Transfer your data elsewhere</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex flex-col items-center text-center">
                          <Lock className="text-cyan-500 mb-2" size={22} />
                          <h4 className="font-medium text-white mb-1">Right to Restrict</h4>
                          <p className="text-gray-400">Limit how your data is used</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800 flex flex-col items-center text-center">
                          <AlertTriangle className="text-cyan-500 mb-2" size={22} />
                          <h4 className="font-medium text-white mb-1">Right to Object</h4>
                          <p className="text-gray-400">Opt out of specific processing</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-2">
                          To exercise any of these rights, access your Neural Dashboard privacy settings or contact our Privacy Enhancement Team at <span className="text-cyan-400">privacy@cyborgcorp.tech</span>.
                        </p>
                      </div>
                  )}
                </div>
              </div>
            ))};
            
            {/* Additional Privacy Information */}
            <div id="additional" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-4">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <HelpCircle className="text-cyan-500" size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Additional Information</h2>
              </div>
              <div className="pl-4 border-l-2 border-gray-800 space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400">Children's Privacy</h3>
                <p className="text-gray-300 leading-relaxed">
                  CyborgCorp products and services are not designed for or directed at individuals under 18 years of age. We do not knowingly collect data from anyone under 18. If we discover we have collected personal information from a child under 18, we will delete that information immediately.
                </p>
                
                <h3 className="text-lg font-semibold text-cyan-400 mt-6">Policy Changes</h3>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make significant changes, we will notify you through your Neural Dashboard notifications and update the "Last Updated" date at the top of this policy. We encourage you to review this policy regularly to stay informed about how we protect your data.
                </p>
                
                <h3 className="text-lg font-semibold text-cyan-400 mt-6">Retention Period</h3>
                <p className="text-gray-300 leading-relaxed">
                  Essential operational data is retained for the lifetime of your enhancement plus five years for safety and warranty purposes. Optional data is retained for a maximum of two years from collection unless you specify a shorter retention period through your Neural Dashboard settings. You can request immediate deletion of optional data at any time.
                </p>
                
                <div className="mt-6 bg-gray-900/70 rounded-lg p-5 border border-gray-800">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-1">Can I use CyborgCorp products without any data collection?</h4>
                      <p className="text-gray-400 text-sm">
                        Essential safety and operational data must be collected for your enhancements to function properly and safely. However, all optional data collection can be disabled without affecting core functionality.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">What happens to my data if I transfer to another provider?</h4>
                      <p className="text-gray-400 text-sm">
                        You can export all your data in standard formats for transfer. Upon request, we will delete all optional data from our systems and provide certification of deletion.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Can my enhancement data be accessed by third parties without my knowledge?</h4>
                      <p className="text-gray-400 text-sm">
                        No. All third-party access to your data is logged and visible in your Neural Dashboard "Access History" section. Emergency access by medical personnel in life-threatening situations is the only exception, and even these instances are logged for your later review.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-white text-center">
                    For questions about our privacy practices, please contact our Privacy Enhancement Team at <span className="text-cyan-400">privacy@cyborgcorp.tech</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Controls Showcase */}
      <section className="py-12 bg-gray-950 relative">
        <div className="absolute inset-0 opacity-10">
          <BackgroundGrid />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Data, <span className="text-cyan-500">Your Control</span></h2>
              <p className="text-gray-400">
                The Neural Dashboard provides easy access to all your privacy settings and controls.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
              <div className="bg-black p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center hover:border-cyan-500/30 hover:bg-cyan-900/5 transition-colors group">
                <div className="bg-gray-900 p-3 rounded-full mb-4 group-hover:bg-cyan-900/30 transition-colors ">
                  <Eye className="text-cyan-500" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">View & Monitor</h3>
                <p className="text-gray-400 text-sm">
                  Access your complete data history and all current collection settings.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center hover:border-cyan-500/30 hover:bg-cyan-900/5 transition-colors group">
                <div className="bg-gray-900 p-3 rounded-full mb-4 group-hover:bg-cyan-900/30 transition-colors">
                  <Lock className="text-cyan-500" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Adjust & Restrict</h3>
                <p className="text-gray-400 text-sm">
                  Fine-tune exactly what data is collected and how it's used
                </p>
              </div>

              <div className="bg-black p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center hover:border-cyan-500/30 hover:bg-cyan-900/5 transition-colors group">
                <div className="bg-gray-900 p-3 rounded-full mb-4 group-hover:bg-cyan-900/30 transition-colors">
                  <Download className="text-cyan-500" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Export & Delete</h3>
                <p className="text-gray-400 text-sm">
                  Download your data or remove it from our systems with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-black relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-cyan-900/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-cyan-900/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to <span className="text-cyan-500">Evolve</span> Securely?</h2>
            <p className="text-gray-400 mb-8">
              Experience the future of human enhancement with privacy and control built into every product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 text-center no-underline">
                Explore Products
              </Link>
              <Link to="/contact" className="border border-cyan-500 hover:bg-cyan-500/10 text-cyan-500 px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 text-center no-underline">
                Contact Us
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
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Neural Implants</Link></li>
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Sensory Enhancements</Link></li>
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Limb Replacements</Link></li>
                <li><Link to="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Organ Upgrades</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">About Us</Link></li>
                <li><Link to="/reviews" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Testimonials</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacyPolicy" className="text-cyan-400 transition-colors cursor-pointer">Privacy Policy</Link></li>
                <li><Link to="/termsOfService" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Terms of Service</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Warranty Info</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer no-underline">Clinical Trials</Link></li>
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