import { Routes, Route } from 'react-router-dom';
import CyborgCorpHomepage from './cyborgcorp.jsx';
import AboutPage from './about.jsx';
import ContactPage from './contact.jsx';
import TermsOfServicePage from './termsOfService.jsx';
import ReviewsPage from './reviews.jsx';
import PrivacyPolicyPagee from './privacyPolicy.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CyborgCorpHomepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/termsOfService" element={<TermsOfServicePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicyPagee />} />
    </Routes>
  );
}

export default App;