import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Heart, Brain, Eye, Cpu, Smartphone, Search, Filter, ShoppingCart, AlertCircle, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import armImg from './media/arm.jpg';
import earImg from './media/ear.jpg';
import eyeImg from './media/eye.jpg';
import heartImg from './media/heart.jpg';
import legImg from './media/leg.jpg';
import lungImg from './media/lung.jpg';
import neuralinkImg from './media/neuralink.jpg';
import regulatorImg from './media/regulator.jpg';
import kidneyImg from './media/kidney.jpg';
import eyeImg2 from './media/eye2.jpg'
import earImg2 from './media/ear2.jpg'
import neuralinkImg2 from './media/neuralink2.jpg'

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

const productsData = [
    {
      id: "armaflex-3000",
      name: "ArmaFlex 3000",
      category: "Limb",
      shortName: "arm",
      description: "Advanced cybernetic arm replacement with precision motor control and tactile sensory feedback. Features carbon fiber construction with titanium reinforcement.",
      features: ["Force-responsive grip control", "Neural integration", "Weather-resistant coating", "500+ sensory nodes"],
      price: 12999,
      rating: 4.8,
      image: armImg
    },
    {
      id: "legimax-ultra",
      name: "LegiMax Ultra",
      category: "Limb",
      shortName: "leg",
      description: "High-performance lower limb enhancement with adaptive terrain response and energy return system. Designed for both everyday use and athletic performance.",
      features: ["Shock absorption system", "Terrain adaptation AI", "Marathon-grade power cell", "Waterproof construction"],
      price: 15499,
      rating: 4.7,
      image: legImg
    },
    {
      id: "ocular-x-9000",
      name: "Ocular X-9000",
      category: "Eye",
      shortName: "eye1",
      description: "Ultra-high definition visual enhancement with 20x optical zoom and night vision capabilities. Seamless neural integration for natural visual processing.",
      features: ["Infrared vision mode", "4K visual recording", "AR overlay capability", "Electromagnetic spectrum analysis"],
      price: 8799,
      rating: 4.9,
      image: eyeImg
    },
    {
      id: "visionpro-infinity",
      name: "VisionPro Infinity",
      category: "Eye",
      shortName: "eye2",
      description: "Premium visual enhancement system with expanded color spectrum perception and microscopic detail resolution. Includes augmented reality interface.",
      features: ["Ultraviolet vision", "Digital zoom up to 30x", "Visual data overlay", "Weather-resistant housing"],
      price: 9299,
      rating: 4.6,
      image: eyeImg2
    },
    {
      id: "audiotech-prime",
      name: "AudioTech Prime",
      category: "Ear",
      shortName: "ear1",
      description: "Audiophile-grade auditory enhancement with precise frequency control and noise isolation. Experience sound beyond human limitations.",
      features: ["Ultrasonic hearing range", "Selective sound filtering", "Directional focus", "Underwater functionality"],
      price: 6499,
      rating: 4.5,
      image: earImg
    },
    {
      id: "claritywave-x",
      name: "ClarityWave X",
      category: "Ear",
      shortName: "ear2",
      description: "Next-generation hearing system with adaptive environmental tuning and conversational focus capability. Perfect for both quiet and crowded environments.",
      features: ["Voice recognition", "Ambient noise control", "Language translation module", "Subvocal command input"],
      price: 7299,
      rating: 4.7,
      image: earImg2
    },
    {
      id: "cardiocore-7",
      name: "CardioCore 7",
      category: "Internal Organ",
      shortName: "heart",
      description: "Advanced cardiac enhancement with adaptive output modulation and integrated monitoring system. Increases circulation efficiency by 35%.",
      features: ["Self-diagnostic system", "Smart rhythm regulation", "Exercise mode", "Remote monitoring"],
      price: 21999,
      rating: 4.9,
      image: heartImg
    },
    {
      id: "pulmolife-alpha",
      name: "PulmoLife Alpha",
      category: "Internal Organ",
      shortName: "lungs",
      description: "Respiratory system augmentation with pollution filtering and oxygen optimization. Designed for enhanced performance in all environmental conditions.",
      features: ["Particulate filtering", "Oxygen enrichment", "Aquatic adaptation", "Elevation compensation"],
      price: 18799,
      rating: 4.8,
      image: lungImg
    },
    {
      id: "hepatogen-x",
      name: "HepatoGen X",
      category: "Internal Organ",
      shortName: "regulator",
      description: "State-of-the-art metabolic enhancement that improves toxin processing and nutrient absorption. Our most advanced biological filtration system.",
      features: ["Accelerated detoxification", "Nutritional optimization", "Self-repair", "Metabolic regulation"],
      price: 16499,
      rating: 4.6,
      image: regulatorImg
    },
    {
      id: "renosys-plus",
      name: "RenoSys Plus",
      category: "Internal Organ",
      shortName: "filter",
      description: "Premium renal enhancement providing superior fluid balance and waste elimination. Reduces metabolic strain and increases overall system efficiency.",
      features: ["Electrolyte balance", "Smart hydration control", "Real-time blood analysis", "AI-driven operation"],
      price: 17299,
      rating: 4.7,
      image: kidneyImg
    },
    {
      id: "neurobridge-pro",
      name: "NeuroBridge Pro",
      category: "Neuralink",
      shortName: "neuralink1",
      description: "Direct neural interface providing seamless integration with all CyborgCorp enhancements. Enables thought control and advanced sensory processing.",
      features: ["Full system integration", "Cognitive enhancement", "Memory augmentation", "Expanded consciousness mode"],
      price: 24999,
      rating: 5.0,
      image: neuralinkImg
    },
    {
      id: "synapselink-max",
      name: "SynapseLink Max",
      category: "Neuralink",
      shortName: "neuralink2",
      description: "Premium neural integration system with expanded bandwidth for simultaneous multi-enhancement control. Features enhanced security protocols.",
      features: ["Multi-device control", "Thought encryption", "Cloud connectivity", "Dreamscape navigation"],
      price: 27999,
      rating: 4.9,
      image: neuralinkImg2
    }
  ];

export default function MarketplacePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const location = useLocation();
  const productsGridRef = useRef(null);

  // Check for category in URL and scroll to products grid
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      // Validate if category exists in our data
      const validCategories = ['All', ...new Set(productsData.map(product => product.category))];
      const categoryExists = validCategories.includes(categoryParam);
      
      if (categoryExists) {
        setSelectedCategory(categoryParam);
        
        // Scroll to products grid
        if (productsGridRef.current) {
          setTimeout(() => {
            productsGridRef.current.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      } else {
        // Scroll to top if category is invalid
        window.scrollTo(0, 0);
      }
    } else {
      // No category specified, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]); 
  
  // Current year calculation
  const currentYear = new Date().getFullYear();

  // Filter products 
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // unique categories for filter
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(productsData.map(product => product.category))];
    return cats;
  }, []);

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

  // icon components
  const PlaceholderIcon = ({ category }) => {
    switch(category) {
      case 'Limb':
        return <CircuitBoard className="text-cyan-400 w-16 h-16" />;
      case 'Eye':
        return <Eye className="text-cyan-400 w-16 h-16" />;
      case 'Ear':
        return <Cpu className="text-cyan-400 w-16 h-16" />;
      case 'Internal Organ':
        return <Heart className="text-cyan-400 w-16 h-16" />;
      case 'Neuralink':
        return <Brain className="text-cyan-400 w-16 h-16" />;
      default:
        return <CircuitBoard className="text-cyan-400 w-16 h-16" />;
    }
  };

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
            <Link to="/buy" className="relative hover:text-cyan-400 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">0</span>
            </Link>
            <Link to="/marketplace" className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
              Marketplace
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
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Marketplace</Link>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundGrid />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Enhance Your <span className="text-cyan-500">Potential</span>
              </h1>
              <p className="text-gray-400 text-lg mb-6">
                Browse our cutting-edge cybernetic enhancements designed to push the boundaries of human capability.
              </p>
              <p className="flex items-center text-gray-300 text-sm mb-6">
                <AlertCircle size={16} className="text-cyan-500 mr-2" />
                All products include our comprehensive 5-year warranty and clinical support package.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg group hover:border-cyan-500 transition-all">
                <CircuitBoard className="text-cyan-500 w-8 h-8 mb-2" />
                <h3 className="font-medium">Premium Materials</h3>
                <p className="text-gray-400 text-sm">Aerospace-grade components for durability and performance</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg group hover:border-cyan-500 transition-all">
                <Brain className="text-cyan-500 w-8 h-8 mb-2" />
                <h3 className="font-medium">Neural Integration</h3>
                <p className="text-gray-400 text-sm">Seamless connection with your nervous system</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg group hover:border-cyan-500 transition-all">
                <Heart className="text-cyan-500 w-8 h-8 mb-2" />
                <h3 className="font-medium">Biocompatible</h3>
                <p className="text-gray-400 text-sm">Designed to work harmoniously with your body</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg group hover:border-cyan-500 transition-all">
                <Smartphone className="text-cyan-500 w-8 h-8 mb-2" />
                <h3 className="font-medium">Smart Control</h3>
                <p className="text-gray-400 text-sm">Intuitive interfaces for personalized configuration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-950 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search enhancements..."
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="text-cyan-500" size={18} />
              <span className="text-gray-400 text-sm">Filter:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    selectedCategory === category 
                      ? 'bg-cyan-500 text-black' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - Added ref for scrolling */}
      <section ref={productsGridRef} className="py-12 relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <BackgroundGrid rows={12} cols={12} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group hover:border-cyan-500 transition-all"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="h-48 relative overflow-hidden bg-gray-950 flex items-center justify-center">
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'}`}>
                      {/* Use actual imported product image */}
                      <div className="flex items-center justify-center h-full w-full bg-gray-900">
                        <PlaceholderIcon category={product.category} />
                        <img src={product.image} alt={product.name} className="absolute object-cover h-full w-full opacity-70" />
                      </div>
                    </div>
                    
                    {/* Features overlay on hover */}
                    <div className={`absolute inset-0 bg-black/80 flex flex-col justify-center p-4 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                      <h4 className="text-cyan-400 font-medium mb-2">Key Features:</h4>
                      <ul className="text-sm space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight size={14} className="text-cyan-500 mr-1" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-3 right-3 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-xs font-medium px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center bg-cyan-500/10 px-2 py-0.5 rounded">
                        <span className="text-cyan-400 text-sm">{product.rating}</span>
                        <Star className="text-cyan-400 ml-1" size={12} />
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-500">${product.price.toLocaleString()}</span>
                      <Link 
                        to={`/product?product=${product.shortName}`}
                        className="bg-cyan-500 hover:bg-cyan-600 text-black text-sm font-medium px-3 py-1.5 rounded transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CircuitBoard className="mx-auto text-cyan-500/50 w-16 h-16 mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or browse all categories</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-4 px-4 py-2 border border-cyan-500 text-cyan-500 rounded hover:bg-cyan-500/10 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-cyan-800/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-cyan-800/30 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Transform?</h2>
            <p className="text-cyan-100 max-w-2xl mx-auto">
              Schedule a consultation with our specialists to find the perfect enhancement for your needs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto justify-center">
            <Link to="/contact" className="bg-black/30 backdrop-blur-sm py-3 px-6 rounded-lg border border-transparent hover:border-cyan-400 transition-all cursor-pointer text-center group">
              <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">Book Consultation</span>
            </Link>
            <Link to="/buy" className="bg-black/30 backdrop-blur-sm py-3 px-6 rounded-lg border border-transparent hover:border-cyan-400 transition-all cursor-pointer text-center group">
              <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">Financing Options</span>
            </Link>
            <Link to="/buy" className="bg-cyan-500 py-3 px-6 rounded-lg text-black font-medium hover:bg-cyan-400 transition-colors cursor-pointer text-center">
              View Cart
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
};