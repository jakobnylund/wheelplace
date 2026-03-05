import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AnnonserPage from './components/AnnonserPage';
import AnnonsPage from './components/AnnonsPage';
import LoginPage from './components/LoginPage';
import KontaktPage from './components/KontaktPage';
import ForfragningarPage from './components/ForfragningarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/annonser" element={<AnnonserPage />} />
        <Route path="/annons/:id" element={<AnnonsPage />} />
        <Route path="/logga-in" element={<LoginPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
        <Route path="/forfragningar" element={<ForfragningarPage />} />
      </Routes>
      <button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-2 border-white p-0"
        onClick={() => {}}
        aria-label="Chatta med oss"
      >
        <img src="/avatar.png" alt="" className="w-full h-full object-cover" />
      </button>
    </BrowserRouter>
  );
}

export default App;
