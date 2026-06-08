import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ImpactPage from '@/pages/ImpactPage';
import DeflectionPage from '@/pages/DeflectionPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/deflection" element={<DeflectionPage />} />
      </Routes>
    </Router>
  );
}
