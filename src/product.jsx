import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, CircuitBoard, Heart, CheckCircle, Cpu, Smartphone, ArrowLeft, Star, AlertCircle, Brain, Eye, ShoppingCart, Phone, Mail, MessageSquare, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './media/logo.jpg';
import armImg from './media/arm.jpg';
import legImg from './media/leg.jpg';
import eyeImg from './media/eye.jpg';
import eyeImg2 from './media/eye2.jpg';
import earImg from './media/ear.jpg';
import earImg2 from './media/ear2.jpg';
import heartImg from './media/heart.jpg';
import lungImg from './media/lung.jpg';
import regulatorImg from './media/regulator.jpg';
import kidneyImg from './media/kidney.jpg';
import neuralinkImg from './media/neuralink.jpg';
import neuralinkImg2 from './media/neuralink2.jpg';

// Background grid component
const BackgroundGrid = ({ rows = 8, cols = 8, className = "" }) => {
  return (
    <div className={`grid grid-cols-${cols <= 12 ? cols : 12} grid-rows-${rows <= 12 ? rows : 12} h-full w-full ${className}`}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="border-t border-l border-gray-800"></div>
      ))}
    </div>
  );
};

// Navbar component
const Navbar = ({ toggleMenu, isMenuOpen }) => {
  return (
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
            <Link to="/contact" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-4">
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
              <Link to="/about" className="text-cyan-400 transition-colors py-2 cursor-pointer">About</Link>
              <Link to="/reviews" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Reviews</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
              <Link to="/nerd" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Buy Now</Link>
            </div>
          </nav>
        )}
      </header>
  );
};

// Footer component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-gray-800 py-8 relative z-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
            <CircuitBoard className="text-cyan-500" size={20} />
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
  );
};

// Rating stars component
const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        return (
          <Star 
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
          />
        );
      })}
      <span className="ml-2 text-gray-300 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ProductPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);
    const [product, setProduct] = useState(null);

  
  const productsData = [
    {
      id: "armaflex-3000",
      name: "ArmaFlex 3000",
      category: "Limb",
      shortName: "arm",
      description: "Advanced cybernetic arm replacement with precision motor control and tactile sensory feedback. Features carbon fiber construction with titanium reinforcement.",
      extendedDescription: "The ArmaFlex 3000 represents the pinnacle of upper limb enhancement technology, offering unparalleled strength-to-weight ratio and sensory feedback that surpasses natural human capability. Designed with a carbon fiber exoskeleton and titanium reinforced joints, this prosthetic enhancement integrates seamlessly with your nervous system via our proprietary neural bridge technology. The arm's adaptive learning algorithms continually optimize movement patterns based on your unique usage, resulting in increasingly natural motion and improved dexterity over time. Perfect for professionals requiring enhanced precision, athletes looking for performance advantages, or anyone seeking to transcend biological limitations.",
      features: [
        {
          name: "Force-responsive grip control",
          description: "Automatically adjusts grip pressure based on object fragility and weight, providing perfect handling from raw eggs to steel beams."
        },
        {
          name: "Neural integration",
          description: "Direct connection to your nervous system provides intuitive control and real-time sensory feedback, making the enhancement feel like a natural extension of your body."
        },
        {
          name: "Weather-resistant coating",
          description: "Hydrophobic nano-coating protects against moisture, dust, and temperature extremes from -40°C to +80°C."
        },
        {
          name: "500+ sensory nodes",
          description: "High-density touch sensors provide hyperrealistic tactile feedback, allowing you to feel textures, temperature, and pressure with greater sensitivity than biological limbs."
        },
        {
          name: "Modular attachment system",
          description: "Specialized tool attachments can be quickly swapped for specific tasks, from precision micromanipulators to heavy-duty power grips."
        }
      ],
      price: 12999,
      rating: 4.8,
      image: armImg,
      releaseDate: "2019",
      warranty: "5-year comprehensive coverage with option to extend",
      powerSource: "Bioenergy converter with backup power cell",
      maintenanceInterval: "Annual checkup recommended"
    },
    {
      id: "legimax-ultra",
      name: "LegiMax Ultra",
      category: "Limb",
      shortName: "leg",
      description: "High-performance lower limb enhancement with adaptive terrain response and energy return system. Designed for both everyday use and athletic performance.",
      extendedDescription: "The LegiMax Ultra revolutionizes mobility with our most advanced lower limb enhancement system to date. Using a combination of carbon fiber composites and our patented muscle-fiber mimicking technology, this enhancement provides extraordinary strength, endurance, and agility. The adaptive terrain response system instantaneously adjusts to surface conditions, ensuring optimal stability and energy efficiency whether you're navigating urban environments or climbing mountain trails. The integrated energy return system captures kinetic energy during movement and redirects it to power your next step, dramatically reducing fatigue during extended use. Experience the freedom of enhanced mobility with the LegiMax Ultra - where human potential meets cutting-edge engineering.",
      features: [
        {
          name: "Shock absorption system",
          description: "Advanced hydraulic dampeners reduce impact forces by up to 80%, protecting joints and spine from repetitive stress."
        },
        {
          name: "Terrain adaptation AI",
          description: "Real-time surface analysis adjusts foot positioning and stability parameters for optimal traction on any terrain, from ice to loose gravel."
        },
        {
          name: "Marathon-grade power cell",
          description: "Energy-harvesting system converts kinetic movement into power, enabling up to 72 hours of continuous use without recharging."
        },
        {
          name: "Waterproof construction",
          description: "Fully sealed system rated for submersion up to 50 meters, perfect for swimming and water sports."
        },
        {
          name: "Performance tuning modes",
          description: "Switch between everyday, sprint, endurance, and climbing modes to optimize your enhancement for specific activities."
        }
      ],
      price: 15499,
      rating: 4.7,
      image: legImg,
      releaseDate: "2019",
      warranty: "5-year comprehensive coverage with option to extend",
      powerSource: "Kinetic energy harvesting with reserve power cell",
      maintenanceInterval: "Annual checkup recommended"
    },
    {
      id: "ocular-x-9000",
      name: "Ocular X-9000",
      category: "Eye",
      shortName: "eye1",
      description: "Ultra-high definition visual enhancement with 20x optical zoom and night vision capabilities. Seamless neural integration for natural visual processing.",
      extendedDescription: "The Ocular X-9000 redefines human vision with cutting-edge optical technology that extends your visual capabilities far beyond biological limitations. This revolutionary visual enhancement system integrates directly with your optic nerve, providing crystal-clear vision across the electromagnetic spectrum. With resolution exceeding 16K per eye and an unprecedented dynamic range, you'll perceive details invisible to the unenhanced human eye. The proprietary neural processing unit translates these enhanced visual inputs into intuitive sensory experiences, making the transition to augmented vision feel completely natural. Whether you're a professional requiring precision visual acuity, a security specialist who needs to see in complete darkness, or someone looking to experience the world with extraordinary clarity, the Ocular X-9000 represents the ultimate visual upgrade.",
      features: [
        {
          name: "Infrared vision mode",
          description: "See heat signatures in complete darkness with temperature sensitivity of 0.01°C, offering unparalleled night vision capability."
        },
        {
          name: "4K visual recording",
          description: "Capture everything you see in ultra-high definition with optional cloud backup and secure storage options."
        },
        {
          name: "AR overlay capability",
          description: "Display contextual information about your surroundings, from identifying plant species to navigational guidance without obstructing normal vision."
        },
        {
          name: "Electromagnetic spectrum analysis",
          description: "Toggle between different light spectrums including ultraviolet and infrared to reveal otherwise invisible details and patterns."
        },
        {
          name: "Microscopic zoom",
          description: "Examine objects as small as 10 micrometers without external equipment, perfect for detailed inspection work."
        }
      ],
      price: 8799,
      rating: 4.9,
      image: eyeImg,
      releaseDate: "2021",
      warranty: "5-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric with neural interface",
      maintenanceInterval: "Biannual calibration recommended"
    },
    {
      id: "visionpro-infinity",
      name: "VisionPro Infinity",
      category: "Eye",
      shortName: "eye2",
      description: "Premium visual enhancement system with expanded color spectrum perception and microscopic detail resolution. Includes augmented reality interface.",
      extendedDescription: "The VisionPro Infinity takes visual enhancement to extraordinary new dimensions, offering an expanded chromatic range that reveals colors beyond human perception. This flagship ocular system uses quantum dot technology to detect and translate ultraviolet and infrared light into visible spectrum representations, giving you unprecedented visual awareness. The built-in neural coprocessor works in harmony with your brain's visual cortex to provide seamless integration of enhanced visuals with your natural perception. The system's microscopic resolution capabilities allow you to zoom in on details as small as cellular structures without external equipment. With the integrated augmented reality interface, you can overlay digital information onto your visual field, from environmental data to complex schematics, all controlled through intuitive eye movements and neural commands.",
      features: [
        {
          name: "Ultraviolet vision",
          description: "Perceive ultraviolet patterns invisible to the natural human eye, revealing hidden details in nature and technology."
        },
        {
          name: "Digital zoom up to 30x",
          description: "Examine distant objects with crystal clarity without physical magnification equipment. Perfect for surveillance, navigation, and exploration."
        },
        {
          name: "Visual data overlay",
          description: "Access real-time information about objects in your field of view, from identification of chemical compounds to structural analysis."
        },
        {
          name: "Weather-resistant housing",
          description: "Sealed construction protects sensitive optics in extreme environmental conditions from desert heat to arctic cold."
        },
        {
          name: "Chromatic enhancement",
          description: "Experience a color gamut 340% wider than natural human vision, revealing subtle variations and patterns previously imperceptible."
        }
      ],
      price: 9299,
      rating: 4.6,
      image: eyeImg2,
      releaseDate: "2020",
      warranty: "5-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric with quantum efficiency coating",
      maintenanceInterval: "Biannual calibration recommended"
    },
    {
      id: "audiotech-prime",
      name: "AudioTech Prime",
      category: "Ear",
      shortName: "ear1",
      description: "Audiophile-grade auditory enhancement with precise frequency control and noise isolation. Experience sound beyond human limitations.",
      extendedDescription: "The AudioTech Prime represents a quantum leap in auditory capability, extending your hearing range and precision far beyond biological limits. This sophisticated cochlear enhancement system replaces traditional hearing with high-definition audio processing that captures sounds from 5Hz to 150kHz with perfect clarity. Our proprietary neural interface transmits these enhanced audio signals directly to your auditory processing centers, creating an immersive and incredibly detailed soundscape. The system's adaptive filtering allows you to focus on specific sound sources even in crowded or noisy environments, effectively tuning out background noise while amplifying chosen signals. With directional audio pinpointing, you can accurately locate sound sources with centimeter precision, even in complex acoustic environments. Perfect for musicians, audio engineers, security professionals, or anyone seeking the ultimate in auditory enhancement.",
      features: [
        {
          name: "Ultrasonic hearing range",
          description: "Detect sounds from 5Hz to 150kHz, far beyond the normal human range of 20Hz to 20kHz, allowing perception of ultrasonic and infrasonic signals."
        },
        {
          name: "Selective sound filtering",
          description: "Isolate specific voices or sounds in crowded environments, effectively eliminating background noise while maintaining crystal clear reception of targeted audio."
        },
        {
          name: "Directional focus",
          description: "Pinpoint and amplify sounds from specific directions with laser-like precision, even at considerable distances."
        },
        {
          name: "Underwater functionality",
          description: "Maintain clear audio reception up to 50 meters underwater, with special algorithms to compensate for aquatic sound propagation characteristics."
        },
        {
          name: "Audio spectrum visualization",
          description: "Optional neural integration allows for real-time visualization of sound waves, bringing a synesthetic dimension to your hearing experience."
        }
      ],
      price: 6499,
      rating: 4.5,
      image: earImg,
      releaseDate: "2024",
      warranty: "5-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric microgenerator",
      maintenanceInterval: "Annual calibration recommended"
    },
    {
      id: "claritywave-x",
      name: "ClarityWave X",
      category: "Ear",
      shortName: "ear2",
      description: "Next-generation hearing system with adaptive environmental tuning and conversational focus capability. Perfect for both quiet and crowded environments.",
      extendedDescription: "The ClarityWave X introduces revolutionary auditory processing technology that transforms how you experience sound. This premium inner ear enhancement uses our advanced neural interface to deliver unprecedented audio clarity and control. The system's adaptive environmental tuning constantly analyzes your surroundings, automatically adjusting to optimize acoustic reception whether you're in a bustling city center or a quiet natural setting. The conversational focus capability uses AI-powered algorithms to identify and enhance human speech while suppressing background noise, making conversations crystal clear even in the most challenging acoustic environments. With integrated language translation processing, the ClarityWave X can provide real-time translation of 47 languages directly to your auditory system. Experience sound as it was meant to be heard with precision, clarity, and complete control.",
      features: [
        {
          name: "Voice recognition",
          description: "Instantly identify and focus on specific voices even in crowded environments, perfect for conferences, social gatherings, and security applications."
        },
        {
          name: "Ambient noise control",
          description: "Selectively filter environmental sounds to create your ideal acoustic experience, from complete noise cancellation to customized ambient awareness."
        },
        {
          name: "Language translation module",
          description: "Real-time translation of 47 languages directly to your auditory system, enabling seamless cross-language communication."
        },
        {
          name: "Subvocal command input",
          description: "Control audio settings through subtle vocal cord movements without audible speech, providing discrete control in public settings."
        },
        {
          name: "Acoustic memory",
          description: "Record and replay up to 72 hours of audio with searchable voice indexing and encrypted storage for privacy."
        }
      ],
      price: 7299,
      rating: 4.7,
      image: earImg2,
      releaseDate: "2020",
      warranty: "5-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric with sound energy harvesting",
      maintenanceInterval: "Annual calibration recommended"
    },
    {
      id: "cardiocore-7",
      name: "CardioCore 7",
      category: "Internal Organ",
      shortName: "heart",
      description: "Advanced cardiac enhancement with adaptive output modulation and integrated monitoring system. Increases circulation efficiency by 35%.",
      extendedDescription: "The CardioCore 7 represents the pinnacle of cardiovascular enhancement technology, offering unprecedented cardiac performance and longevity. This revolutionary artificial heart system uses biomimetic materials and advanced fluid dynamics to create a pulsatile flow that perfectly mimics natural circulation while improving efficiency by 35%. The system's adaptive output modulation continuously adjusts blood flow based on your body's changing needs, from rest to peak physical exertion, ensuring optimal oxygen delivery to tissues at all times. The integrated monitoring system provides real-time analysis of blood chemistry, pressure, and flow rates, alerting you to potential issues before they become problematic. With a projected operational lifespan of 50+ years without major maintenance, the CardioCore 7 offers peace of mind along with superior cardiovascular performance. Experience life with boundless energy and circulatory health that exceeds natural biological limitations.",
      features: [
        {
          name: "Self-diagnostic system",
          description: "Continuous monitoring of over 200 performance parameters with predictive maintenance alerts and automatic adjustment capability."
        },
        {
          name: "Smart rhythm regulation",
          description: "AI-controlled pacing adjusts to your body's needs, from sleep states to extreme exertion, maintaining optimal circulation at all times."
        },
        {
          name: "Exercise mode",
          description: "Dramatically increases cardiac output during physical activity, delivering up to 300% more oxygen to muscles compared to natural hearts."
        },
        {
          name: "Remote monitoring",
          description: "Secure connection to CyborgCorp medical systems allows for remote diagnostics and performance optimization by our cardiac specialists."
        },
        {
          name: "Emergency backup",
          description: "Redundant systems and fail-safes ensure continued operation even under extreme conditions or damage, with 72-hour autonomous backup power."
        }
      ],
      price: 21999,
      rating: 4.9,
      image: heartImg,
      releaseDate: "2020",
      warranty: "10-year comprehensive coverage with option to extend",
      powerSource: "Bioenergy converter with backup power cell",
      maintenanceInterval: "Biannual checkup recommended"
    },
    {
      id: "pulmolife-alpha",
      name: "PulmoLife Alpha",
      category: "Internal Organ",
      shortName: "lungs",
      description: "Respiratory system augmentation with pollution filtering and oxygen optimization. Designed for enhanced performance in all environmental conditions.",
      extendedDescription: "The PulmoLife Alpha transforms respiratory function with cutting-edge biomedical engineering that far surpasses natural lung capability. This comprehensive respiratory enhancement system uses nanofibrous membranes with microscopic oxygen carriers to increase gas exchange efficiency by 180% compared to natural lungs. The integrated pollution filtering system removes 99.97% of airborne contaminants, including particulate matter, toxic gases, and biological agents, ensuring you breathe only the purest air regardless of environmental conditions. Oxygen enrichment technology selectively concentrates oxygen molecules from ambient air, enabling comfortable breathing even in low-oxygen environments like high altitudes or underwater. The system's adaptive pressure regulation automatically adjusts to environmental conditions, making transitions from sea level to mountain altitudes or underwater environments seamless and comfortable. Experience breathing performance that transcends natural limitations with the PulmoLife Alpha.",
      features: [
        {
          name: "Particulate filtering",
          description: "Removes 99.97% of airborne contaminants down to 0.01 microns, including dust, allergens, pollution, and pathogens."
        },
        {
          name: "Oxygen enrichment",
          description: "Selectively concentrates oxygen from ambient air, increasing oxygen saturation by up to 15% in normal conditions and more in low-oxygen environments."
        },
        {
          name: "Aquatic adaptation",
          description: "Extract oxygen directly from water for up to 3 hours of continuous underwater breathing without external equipment."
        },
        {
          name: "Elevation compensation",
          description: "Automatically adjusts respiratory function at high altitudes, maintaining full physical performance up to 25,000 feet without acclimatization."
        },
        {
          name: "Metabolic optimization",
          description: "Synchronizes with your CardioCore system to maximize oxygen utilization efficiency during physical exertion, reducing fatigue."
        }
      ],
      price: 18799,
      rating: 4.8,
      image: lungImg,
      releaseDate: "2020",
      warranty: "8-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric with respiratory motion harvesting",
      maintenanceInterval: "Annual checkup recommended"
    },
    {
      id: "hepatogen-x",
      name: "HepatoGen X",
      category: "Internal Organ",
      shortName: "regulator",
      description: "State-of-the-art metabolic enhancement that improves toxin processing and nutrient absorption. Our most advanced biological filtration system.",
      extendedDescription: "The HepatoGen X represents a revolution in metabolic enhancement technology, offering unprecedented detoxification capacity and metabolic regulation. This advanced synthetic liver system uses genetically engineered hepatocytes and nanoscale filtration membranes to process toxins and metabolites with 320% greater efficiency than a natural liver. The accelerated detoxification system can neutralize a wide range of compounds from alcohol and pharmaceuticals to environmental toxins and natural metabolic byproducts, reducing recovery time and minimizing cellular damage. Enhanced nutrient processing maximizes the absorption of essential vitamins, minerals, and macronutrients from your diet, optimizing your body's utilization of nutrition. The HepatoGen X's adaptive regulation system continuously monitors and adjusts metabolic pathways to maintain ideal homeostasis under all conditions, from fasting to feasting, rest to extreme exertion. Experience optimal biochemical balance and unprecedented resilience with our most advanced biological filtration system.",
      features: [
        {
          name: "Accelerated detoxification",
          description: "Process toxins including alcohol, pharmaceuticals, and environmental pollutants at 320% the rate of a natural liver, reducing recovery time and damage."
        },
        {
          name: "Nutritional optimization",
          description: "Enhanced processing of nutrients increases absorption efficiency by up to 40%, maximizing the benefit from your dietary intake."
        },
        {
          name: "Self-repair",
          description: "Advanced regenerative matrix allows for continuous self-maintenance and repair, ensuring consistent performance over decades of use."
        },
        {
          name: "Metabolic regulation",
          description: "Fine-tune your body's metabolism for optimal energy utilization, whether you're fasting, feasting, or maintaining a specific nutritional regimen."
        },
        {
          name: "Chemical analysis",
          description: "Real-time monitoring of blood chemistry with alerts for imbalances or concerning compounds before they cause symptoms."
        }
      ],
      price: 16499,
      rating: 4.6,
      image: regulatorImg,
      releaseDate: "2021",
      warranty: "8-year comprehensive coverage with option to extend",
      powerSource: "Bioenergy converter with glucose backup",
      maintenanceInterval: "Annual checkup recommended"
    },
    {
      id: "renosys-plus",
      name: "RenoSys Plus",
      category: "Internal Organ",
      shortName: "filter",
      description: "Premium renal enhancement providing superior fluid balance and waste elimination. Reduces metabolic strain and increases overall system efficiency.",
      extendedDescription: "The RenoSys Plus delivers revolutionary advancements in renal function, offering unprecedented filtration efficiency and homeostatic control. This comprehensive kidney enhancement system utilizes our patented nanoporous filtration membranes and bioengineered tubular structures to achieve filtration rates 250% higher than natural kidneys with significantly improved selectivity. The electrolyte balance system continuously monitors and adjusts blood chemistry in real-time, maintaining perfect ionic composition regardless of diet or activity level. Advanced hydration monitoring integrates with neural systems to optimize fluid intake signals, eliminating guesswork about your hydration status. The integrated blood analysis module continuously screens for over 500 biomarkers, providing early detection of potential health concerns long before symptoms would develop. Experience perfect fluid balance, optimal waste elimination, and comprehensive metabolic monitoring with the RenoSys Plus - the ultimate renal enhancement system.",
      features: [
        {
          name: "Electrolyte balance",
          description: "Real-time monitoring and adjustment of essential electrolytes regardless of diet or activity, maintaining perfect homeostasis at all times."
        },
        {
          name: "Smart hydration control",
          description: "Advanced sensors monitor hydration status with precision, providing clear guidance on fluid intake needs and optimizing water balance."
        },
        {
          name: "Real-time blood analysis",
          description: "Continuous screening for over 500 biomarkers provides early warning of potential health concerns before symptoms develop."
        },
        {
          name: "AI-driven operation",
          description: "Machine learning algorithms constantly optimize filtration parameters based on your unique physiology and changing conditions."
        },
        {
          name: "Emergency detox capability",
          description: "Rapid-response mode can quickly eliminate dangerous compounds from the bloodstream, offering protection against accidental exposures or overdoses."
        }
      ],
      price: 17299,
      rating: 4.7,
      image: kidneyImg,
      releaseDate: "2020",
      warranty: "8-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric with ionic gradient harvesting",
      maintenanceInterval: "Annual checkup recommended"
    },
    {
      id: "neurobridge-pro",
      name: "NeuroBridge Pro",
      category: "Neuralink",
      shortName: "neuralink1",
      description: "Direct neural interface providing seamless integration with all CyborgCorp enhancements. Enables thought control and advanced sensory processing.",
      extendedDescription: "The NeuroBridge Pro represents the pinnacle of neural interface technology, creating a seamless connection between your consciousness and digital systems. This revolutionary brain-computer interface uses our proprietary quantum neural mapping to establish high-bandwidth connections with your nervous system at the speed of thought. The full system integration capability coordinates all your CyborgCorp enhancements into a unified experience, allowing simultaneous control of multiple systems through intuitive thought commands. Enhanced cognitive processing supplements your natural abilities with accelerated calculation, perfect recall, and expanded working memory. The memory augmentation system creates perfect recordings of experiences that can be recalled with complete sensory fidelity, revolutionizing how you learn and remember. The expanded consciousness mode enables previously impossible mental states, including enhanced creativity, problem-solving, and multidimensional thinking. Experience the ultimate neural upgrade with the NeuroBridge Pro - where mind transcends biological limitation.",
      features: [
        {
          name: "Full system integration",
          description: "Coordinate all your CyborgCorp enhancements through a single mental interface, allowing simultaneous control with intuitive thought commands."
        },
        {
          name: "Cognitive enhancement",
          description: "Supplement your natural thinking with accelerated calculation, perfect recall, and dramatically expanded working memory capacity."
        },
        {
          name: "Memory augmentation",
          description: "Create perfect recordings of experiences that can be recalled with complete sensory fidelity, revolutionizing learning and memory."
        },
        {
          name: "Expanded consciousness mode",
          description: "Access previously impossible mental states, including enhanced creativity, multidimensional problem-solving, and expanded awareness."
        },
        {
          name: "Neural firewall",
          description: "Military-grade security protocols protect your thoughts and neural data from unauthorized access or external manipulation."
        }
      ],
      price: 24999,
      rating: 5.0,
      image: neuralinkImg,
      releaseDate: "2019",
      warranty: "10-year comprehensive coverage with option to extend",
      powerSource: "Bioelectric with neural activity harvesting",
      maintenanceInterval: "Biannual calibration recommended"
    },
    {
      id: "synapselink-max",
      name: "SynapseLink Max",
      category: "Neuralink",
      shortName: "neuralink2",
      description: "Premium neural integration system with expanded bandwidth for simultaneous multi-enhancement control. Features enhanced security protocols.",
      extendedDescription: "The SynapseLink Max delivers our most advanced neural integration technology, establishing a revolutionary high-bandwidth connection between your consciousness and the digital universe. This flagship neural interface employs quantum entanglement principles to create instantaneous communication channels with zero latency, enabling truly seamless integration between thought and action. The multi-device control system allows you to operate numerous digital systems and cybernetic enhancements simultaneously through elegant thought commands, creating an extension of will that feels completely natural. Industry-leading thought encryption protects your neural data with unbreakable quantum security protocols, ensuring absolute privacy of your most personal information - your thoughts. Integrated cloud connectivity provides on-demand access to vast computational resources and data repositories, exponentially expanding your effective intelligence. The revolutionary dreamscape navigation system allows conscious exploration and control of sleep states, opening new frontiers in rest, creativity, and subconscious integration. Experience consciousness without constraints with the SynapseLink Max.",
      features: [
        {
          name: "Multi-device control",
          description: "Simultaneously operate numerous digital systems and cybernetic enhancements through elegant thought commands with zero perceptible lag."
        },
        {
          name: "Thought encryption",
          description: "Military-grade quantum encryption protects your neural data with unbreakable security, ensuring absolute privacy of your thoughts and memories."
        },
        {
          name: "Cloud connectivity",
          description: "Direct neural access to vast computational resources and data repositories, exponentially expanding your effective intelligence and capabilities."
        },
        {
          name: "Dreamscape navigation",
          description: "Conscious exploration and control of sleep states, enabling directed dreaming, enhanced learning during rest, and subconscious integration."
        },
        {
          name: "Neural threading",
          description: "Revolutionary parallel processing allows multiple simultaneous thought streams, enabling unprecedented multitasking and cognitive throughput."
        }
      ],
      price: 27999,
      rating: 4.9,
      image: neuralinkImg2,
      releaseDate: "2023",
      warranty: "10-year comprehensive coverage with lifetime upgrades",
      powerSource: "Quantum neural energy harvesting",
      maintenanceInterval: "Biannual calibration recommended"
    }
  ];
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productParam = searchParams.get('product');
    
    if (productParam) {
      const foundProduct = productsData.find(p => p.shortName === productParam);
      if (foundProduct) {
        setProduct(foundProduct);
        window.scrollTo(0, 0);
      }
    }
  }, [location]);

    // Cursor glow
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

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Limb':
        return <CircuitBoard className="text-cyan-400 w-6 h-6" />;
      case 'Eye':
        return <Eye className="text-cyan-400 w-6 h-6" />;
      case 'Ear':
        return <Cpu className="text-cyan-400 w-6 h-6" />;
      case 'Internal Organ':
        return <Heart className="text-cyan-400 w-6 h-6" />;
      case 'Neuralink':
        return <Brain className="text-cyan-400 w-6 h-6" />;
      default:
        return <CircuitBoard className="text-cyan-400 w-6 h-6" />;
    }
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <CircuitBoard className="mx-auto text-cyan-500 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="mt-2 text-gray-400">The product you're looking for doesn't exist or is no longer available.</p>
          <Link to="/marketplace" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-cyan-500 hover:bg-cyan-600">
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      <div
        ref={cursorRef}
        className="fixed w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none z-10 opacity-50"
        style={{
          willChange: 'transform', // Hint for browser optimization totally was my idea
        }}
      />
      
      {/* Background grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <BackgroundGrid rows={20} cols={20} />
      </div>
      
      {/* Navbar */}
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product container */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden mb-12">
            {/* Product header */}
            <div className="text-center py-6 border-b border-gray-800 px-6">
              <div className="flex items-center justify-center">
                {getCategoryIcon(product.category)}
                <span className="ml-2 text-sm font-medium text-cyan-400">{product.category} Enhancement</span>
              </div>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">{product.name}</h1>
            </div>
            
            {/* Product content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product image */}
              <div className="flex justify-center items-center">
                <div className="relative rounded-lg overflow-hidden border border-gray-700 w-full max-w-md">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Cpu className="h-6 w-6 text-cyan-500" />
                        <span className="ml-1 text-sm font-medium text-cyan-400">Released: {product.releaseDate}</span>
                      </div>
                      <div className="ml-4 flex items-center">
                        <AlertCircle className="h-6 w-6 text-cyan-500" />
                        <span class="ml-1 text-sm font-medium text-cyan-400">{product.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product details */}
              <div className="flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <RatingStars rating={product.rating} />
                  <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4 mb-6 border border-gray-800">
                  <p className="text-gray-300 leading-relaxed">
                    {product.extendedDescription}
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <CircuitBoard className="h-5 w-5 text-cyan-500" />
                    <span className="ml-2 text-sm font-medium text-gray-300">Power Source: {product.powerSource}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-cyan-500" />
                    <span className="ml-2 text-sm font-medium text-gray-300">Maintenance: {product.maintenanceInterval}</span>
                  </div>
                </div>
                
                <Link to="/buy" className="mt-auto bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg font-bold text-center flex items-center justify-center transition duration-300">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Purchase Now
                </Link>
              </div>
            </div>
          
            {/* Features section */}
            <div className="border-t border-gray-800 p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start mb-4 transition-all duration-300 hover:translate-x-2 rounded-lg p-2 cursor-pointer group"
                  >
                    <div className="flex-shrink-0 bg-cyan-500/20 p-2 rounded group-hover:bg-cyan-500/30 transition-colors">
                      <CheckCircle className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div className="ml-3">
                    <h4 class="text-xl text-white font-medium transition-colors duration-300 group-hover:text-cyan-500">{feature.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
          {/* Contact section */}
          <div className="bg-cyan-900 rounded-xl shadow-xl overflow-hidden relative py-12">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-cyan-800/50 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-cyan-800/30 to-transparent"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                      <div className="text-center mb-8">
                          <h2 className="text-2xl md:text-3xl font-bold mb-2">Have Questions About {product.name}?</h2>
                          <p className="text-cyan-100"> Contact us to ask product-specific questions or to request a consultation. </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                          {/* Phone */}
                          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center hover:bg-black/40 transition-colors cursor-pointer group">
                              <div className="bg-cyan-500/20 p-3 rounded-full mb-3 group-hover:bg-cyan-500/30 transition-colors">
                                  <Phone className="text-cyan-400" size={24} />
                              </div>
                              <h3 className="font-medium mb-2">Phone</h3>
                              <p className="text-cyan-100 text-sm">+1-987-654-320</p>
                          </div>
                          {/* Mobile */}
                          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center text-center hover:bg-black/40 transition-colors cursor-pointer group">
                              <div className="bg-cyan-500/20 p-3 rounded-full mb-3 group-hover:bg-cyan-500/30 transition-colors">
                                  <Smartphone className="text-cyan-400" size={24} />
                              </div>
                              <h3 className="font-medium mb-2">Mobile</h3>
                              <p className="text-cyan-100 text-sm">+1-234-567-890</p>
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
                    <div className="flex justify-center mt-10">
                        <Link 
                            to="/contact" 
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg 
                            transition-all duration-300 transform hover:scale-105 flex items-center gap-2 
                            shadow-lg hover:shadow-cyan-500/30"
                        >
                            <MessageSquare size={18} />
                            <span>Direct Contact</span>
                        </Link>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};