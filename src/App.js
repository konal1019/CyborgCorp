import { Routes, Route } from 'react-router-dom';
import CyborgCorpHomepage from './cyborgcorp.jsx';
import AboutPage from './about.jsx';
import ContactPage from './contact.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CyborgCorpHomepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;