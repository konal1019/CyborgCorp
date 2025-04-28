import { Routes, Route } from 'react-router-dom';
import CyborgCorpHomepage from './cyborgcorp.jsx';
import AboutPage from './about.jsx';
import ContactPage from './contact.jsx';
import TermsOfServicePage from './termsOfService.jsx';
import ReviewsPage from './reviews.jsx';
import PrivacyPolicyPagee from './privacyPolicy.jsx';
import NerdPage from './nerd.jsx';
import MarketplacePage from './marketplace.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CyborgCorpHomepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/termsOfService" element={<TermsOfServicePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicyPagee />} />
      <Route path="/nerd" element={<NerdPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
    </Routes>
  );
}

export default App;