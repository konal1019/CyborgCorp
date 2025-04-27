import { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, CircuitBoard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

// Background grid component reused from homepage
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

export default function Reviews() {
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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorTimeout = useRef(null);
  const isMoving = useRef(false);
  const [showMore, setShowMore] = useState({});

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  // Current year calculation
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 7;

  const products = [
    "ArmaFlex 3000 (Limb)",
    "LegiMax Ultra (Limb)",
    "Ocular X-9000 (Eye)",
    "VisionPro Infinity (Eye)",
    "AudioTech Prime (Ear)",
    "ClarityWave X (Ear)",
    "CardioCore 7 (Internal Organ)",
    "PulmoLife Alpha (Internal Organ)",
    "HepatoGen X (Internal Organ)",
    "RenoSys Plus (Internal Organ)",
    "NeuroBridge Pro (Neuralink)",
    "SynapseLink Max (Neuralink)",
  ];

  const reviews = useMemo(() => {
    const generatedReviews = [];
    const names = [
      "Alex Johnson",
      "Casey Williams",
      "Jordan Lee",
      "Riley Davis",
      "Morgan Smith",
      "Jamie Anderson",
      "Taylor Nguyen",
      "Blake Garcia",
      "Quinn Martinez",
      "Dakota Rodriguez",
      "Avery Hernandez",
      "Cameron Lopez",
      "Rowan Green",
      "Harper King",
      "Finley Scott",
    ];
    const reviewTexts = {
      "ArmaFlex 3000 (Limb)": [
        { text: "Wow, this limb feels so incredibly natural! It integrated seamlessly and responds to my thoughts almost instantly. I feel like I was genuinely born with this level of dexterity and strength. The build quality is amazing, and it's already allowed me to return to activities I thought were impossible. Truly groundbreaking technology!", stars: 5 },
        { text: "The range of motion on the ArmaFlex 3000 is absolutely mind-blowing. I can achieve complex movements with ease, allowing me to perform tasks that were previously unimaginable. It's given me back so much independence and capability. Worth every single credit!", stars: 5 },
        { text: "A sturdy and reliable limb. Installation was smooth, and while there was a slight learning curve to fully utilize its advanced features, it has made a substantial, positive difference in my daily life. I can carry heavier loads and move with much more confidence.", stars: 4 },
        { text: "Really impressive! Integration was straightforward, and the basic functions are intuitive. I'm still exploring the full potential, but so far, I am extremely happy with this purchase. It's solid and dependable.", stars: 5 },
      ],
      "LegiMax Ultra (Limb)": [
        { text: "This limb is a significant upgrade from my previous model. The speed of response and sheer power are incredible. I feel faster and stronger than I ever have before. It's completely transformed my mobility and ability to engage in strenuous activities.", stars: 5 },
        { text: "It definitely took a period of adjustment to get used to the enhanced capabilities, especially the speed. But now that I've calibrated it to my needs, I absolutely love it! It's very fast, incredibly durable, and handles demanding situations with ease. A solid piece of engineering.", stars: 4 },
        { text: "Performance is top-notch – it's undeniably powerful and quick. My only minor complaint is that it could be slightly more comfortable for extended wear, but the functional benefits far outweigh this. A fantastic choice for those prioritizing raw performance.", stars: 4 },
      ],
      "Ocular X-9000 (Eye)": [
        { text: "My vision is beyond anything I could have imagined! Clarity is astonishingly sharp, and I can perceive details from a distance I never thought possible. The color spectrum seems richer, and low-light performance is exceptional. A truly transformative product!", stars: 5 },
        { text: "The night vision mode on the Ocular X-9000 isn't just a feature, it's like having a superpower! Navigating in near-total darkness is effortless. Installation was surprisingly quick, and I'm seeing spectacular results in all lighting conditions. This is a genuine game-changer.", stars: 5 },
        { text: "The installation process was professional and relatively painless. I'm still calibrating some of the advanced visual filters, but I am already seeing significantly improved clarity and detail. Great results so far.", stars: 5 },
        { text: "Incredible clarity, far exceeding standard biological vision. The visual processing is rapid and seamless. It took a little while to fully adjust to the enhanced data stream and modes, but the visual acuity is worth the adaptation period. Highly recommended.", stars: 4 },
      ],
      "VisionPro Infinity (Eye)": [
        { text: "The level of visual detail is simply mind-blowing. Every single pixel of my reality looks incredibly vivid and sharp. I'm noticing textures and subtle variations I never perceived before. It's like seeing the world in high definition for the first time!", stars: 5 },
        { text: "I am absolutely blown away by the quality of the VisionPro Infinity. The color accuracy and depth perception are unparalleled. This product is worth every single credit and then some. If you want the best visual experience, this is it. No regrets whatsoever!", stars: 5 },
        { text: "A significant investment, but the visual fidelity justifies the cost. While it is slightly more expensive than other options, the clarity and feature set make it worth the money if you prioritize top-tier vision. Very satisfied with the performance.", stars: 4 },
      ],
      "AudioTech Prime (Ear)": [
        { text: "I can hear sounds I never knew existed before! The audio range and clarity are crystal clear, picking up even the faintest noises. Environmental filtering is excellent, allowing me to focus on what's important. A truly immersive auditory experience!", stars: 5 },
        { text: "The noise cancellation on the AudioTech Prime is simply incredible. It creates a perfect bubble of silence when I need it, allowing me to concentrate or simply enjoy pure audio. It's like stepping into a different dimension of sound. Fantastic technology!", stars: 5 },
        { text: "This ear unit works well and is very sensitive to sound, which is great for picking up subtle audio cues. I'm still learning to fine-tune the filters and sensitivity settings to avoid being overwhelmed, but overall, I'm happy with the performance.", stars: 4 },
      ],
      "ClarityWave X (Ear)": [
        { text: "The clarity of sound with the ClarityWave X is unbelievable. I can distinguish every nuance in music and conversation, even in noisy environments. It's a level of auditory detail I never thought possible. Truly remarkable!", stars: 5 },
        { text: "Very lightweight and incredibly comfortable. I honestly forget I'm even wearing it most of the time. The discreet design is a bonus, and the performance is top-tier. A seamless and powerful audio enhancement.", stars: 5 },
        { text: "It can be a bit too sensitive sometimes, picking up distant sounds I don't necessarily need to hear. However, with some minor adjustments, the overall performance is incredible. A powerful product with amazing clarity.", stars: 4 },
        { text: "Does exactly what it says on the tin. Improved my hearing significantly. Can't complain.", stars: 5 },
      ],
      "CardioCore 7 (Internal Organ)": [
        { text: "Since the CardioCore 7 implant, my energy levels have absolutely skyrocketed! I feel like I have the stamina and vitality of someone half my age. It's amazing the difference a healthy, efficient internal system makes. Truly life-changing!", stars: 5 },
        { text: "I am completely amazed by the positive impact the CardioCore 7 has had on my overall health and well-being. My circulation is better, and I no longer experience the fatigue I used to. This has been a transformative upgrade.", stars: 5 },
        { text: "It's been a few weeks since the procedure, and so far, so good. I haven't noticed dramatic changes yet, but I feel a general sense of improved stability. I'm optimistic about the long-term benefits.", stars: 4 },
      ],
      "PulmoLife Alpha (Internal Organ)": [
        { text: "Breathing feels completely effortless now. It's like my lungs have been reset! I have so much more energy and can engage in physical activities without getting winded. This upgrade was not just beneficial, it was a genuine lifesaver. Highly recommended!", stars: 5 },
        { text: "I feel like a completely new person since receiving the PulmoLife Alpha. My oxygen levels are consistently optimal, and the feeling of being able to breathe deeply and easily is incredible. This technology is a marvel.", stars: 5 },
        { text: "The change in my respiratory function is incredible. I can take full, deep breaths without discomfort for the first time in years. Worth every single credit for the improvement in quality of life.", stars: 5 },
        { text: "Works as described. Breathing is easier. No complaints so far.", stars: 4 },
      ],
      "HepatoGen X (Internal Organ)": [
        { text: "My body feels so much healthier and more efficient since the HepatoGen X implant. My metabolism is regulated, and I just have a general sense of well-being that I haven't experienced in years. I've truly never felt better!", stars: 5 },
        { text: "This implant has completely changed my health for the better. My system feels revitalized, and I have more consistent energy throughout the day. It's amazing what optimized internal organs can do. A fantastic investment in my health.", stars: 5 },
        { text: "Impressed with the results so far. I feel like I have more energy and more drive to tackle my daily tasks. The integration seems to have gone smoothly, and I'm feeling optimistic about the continued benefits.", stars: 5 },
        { text: "Still waiting to see more significant results in some areas, but it's been good so far. No negative side effects, and I feel slightly more balanced internally. Hopefully, the benefits will become more pronounced with time.", stars: 3 },
      ],
      "RenoSys Plus (Internal Organ)": [
        { text: "It's like having a brand new filtration system! My body feels so much cleaner and more efficient. I'm experiencing increased vitality and a general sense of improved health. I am incredibly grateful for this life-enhancing technology.", stars: 5 },
        { text: "I'm feeling healthier than I have in years, and I attribute a significant part of that to the RenoSys Plus. The difference in how I feel day-to-day is like night and day. It's a truly transformative internal upgrade.", stars: 5 },
        { text: "This was a great decision for my health. My body feels much healthier and more balanced internally. The procedure was straightforward, and the recovery was quicker than I expected. Very positive experience.", stars: 5 },
      ],
      "NeuroBridge Pro (Neuralink)": [
        { text: "The cognitive boost from the NeuroBridge Pro is absolutely unreal! I'm experiencing enhanced focus, faster information processing, and significantly improved productivity. My ability to learn and retain information has dramatically increased. It's like unlocking a new level of my brain!", stars: 5 },
        { text: "The future is now! This neural link has exceeded every one of my expectations. The seamless interface with digital devices and the sheer speed of thought-to-action is astounding. It's not just an upgrade; it's a complete paradigm shift in how I interact with technology and my own mind.", stars: 5 },
        { text: "There was a bit of a learning curve to fully integrate the neural interface and customize the settings. However, the cognitive benefits and enhanced control over external devices are immense. Definitely worth the effort to adapt.", stars: 4 },
      ],
      "SynapseLink Max (Neuralink)": [
        { text: "My brain feels like it's running on a whole new level of processing power and connectivity. The SynapseLink Max has amplified my cognitive abilities in ways I didn't think were possible. Multitasking is effortless, and creative flow is constant. Phenomenal!", stars: 5 },
        { text: "This product is truly groundbreaking. It's completely changed the way I think, learn, and work. The ability to directly interface with information streams is revolutionary. It's an expensive investment, but for the cognitive leap it provides, it's undeniably worth the money.", stars: 5 },
        { text: "It's certainly an expensive piece of tech, but the cognitive enhancements are noticeable. While the price point is high, the boost in mental processing speed and connectivity makes it worth the money if you need that edge. A solid, high-performance neural link.", stars: 4 },
      ],
    };
    
    products.forEach((product) => {
        for (let i = 0; i < 3; i++) {
          const selectedReview = reviewTexts[product][Math.floor(Math.random() * reviewTexts[product].length)];
          generatedReviews.push({
            id: `${product}-${i}`,
            name: names[Math.floor(Math.random() * names.length)],
            product: product,
            stars: selectedReview.stars,
            text: selectedReview.text,
          });
        }
      });
    return generatedReviews;
  }, []);

  const handleShowMore = (product) => {
    setShowMore((prevState) => ({
      ...prevState,
      [product]: !prevState[product],
    }));
  };

  const getReviewsForProduct = (product) => {
    return reviews.filter((review) => review.product === product);
  };

  const displayedReviews = (product) => {
    const productReviews = getReviewsForProduct(product);
    if (showMore[product]) {
      return productReviews;
    } else {
      return productReviews.slice(0, 1);
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
            <Link to="/reviews" className="text-cyan-400 transition-colors cursor-pointer hover:scale-105">Reviews</Link>
            <Link to="/nerd" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Technology</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors cursor-pointer hover:scale-105">Contact</Link>
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
              <Link to="/reviews" className="text-cyan-400 transition-colors py-2 cursor-pointer">Reviews</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Contact</Link>
              <Link to="/nerd" className="hover:text-cyan-400 transition-colors py-2 cursor-pointer">Technology</Link>
              <Link to="/marketplace" className="text-cyan-400 transition-colors py-2 cursor-pointer">Buy Now</Link>
            </div>
          </nav>
        )}
      </header>
        <main className='pt-24'>
             <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                <BackgroundGrid />
                </div>
                <div className='container mx-auto px-4 relative z-10'>
                    <div className='flex flex-col items-center'>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Our <span className="text-cyan-500">Reviews</span>
                        </h1>
                        <p className='text-gray-400 text-lg'>See what the community has to say about us</p>
                    </div>
                </div>
            </section>
            <section className='py-12 relative'>
                <div className='absolute inset-0 z-0 opacity-5'>
                    <BackgroundGrid rows={20} cols={20}/>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                <div className='flex flex-col gap-8'>
                  {products.map((product) => (
                    <div key={product} className='border border-gray-800 p-6 rounded-lg'>
                        <h3 className='text-2xl text-cyan-500 font-bold mb-6'>{product} Reviews</h3>
                        <div className='flex flex-col'>
                          {displayedReviews(product).map((review) => (
                            <article key={review.id} className="border-b border-gray-800 pb-6 mb-6">
                                <h4 className="text-lg font-semibold mb-2">Review by {review.name}</h4>
                                <div className="flex items-center mb-2">
                                    {Array.from({ length: review.stars }).map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-cyan-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>
                                    ))}
                                </div>
                                <p className="text-gray-300">{review.text}</p>
                            </article>
                        ))}
                        </div>
                        {getReviewsForProduct(product).length > 1 && (
                            <button
                            className="text-cyan-400 hover:text-cyan-500 transition-colors mt-4"
                            onClick={() => handleShowMore(product)}
                            >
                            {showMore[product] ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>
                    ))}
                     <button onClick={() => alert("You are not eligible to add a review at this time.")} className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 text-center">
                          Add a Review
                      </button>
                    </div>
                </div>
            </section>
        </main>
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
                <li><Link to="/reviews" className="text-cyan-400 transition-colors cursor-pointer">Testimonials</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to='/privacyPolicy' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</Link></li>
                <li><Link to='/termsOfService' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</Link></li>
                <li><Link to='/termsOfService?section=warranty' className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Warranty Info</Link></li>
                <li><Link tp="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">Clinical Trials</Link></li>
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