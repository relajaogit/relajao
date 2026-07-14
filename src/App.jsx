import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // Añadido el import que faltaba
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { SettingsProvider } from './context/SettingsContext';
import WelcomeBook from './components/WelcomeBook';
import PublicLayout from './components/PublicLayout'; // Importamos tu nuevo Layout

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          
          {/* 1. PAGINAS PRINCIPALES (Tienen Navbar, Footer y estructura min-h-screen) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* 2. RUTA DEL WELCOME BOOK (100% aislada, sin Navbar ni Footer) */}
          <Route path="/guia/:id" element={<WelcomeBook />} />

        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;