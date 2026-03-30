import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AnnonserPage from './components/AnnonserPage';
import AnnonsPage from './components/AnnonsPage';
import LoginPage from './components/LoginPage';
import KontaktPage from './components/KontaktPage';
import ForfragningarPage from './components/ForfragningarPage';
import ChatBot from './components/ui/ChatBot';
import AnnonserPrototype from './annonser';
import Deck from './deck';

function ChatBotWrapper() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/deck')) return null;
  return <ChatBot />;
}

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
        <Route path="/annonser-proto/*" element={<AnnonserPrototype />} />
        <Route path="/deck" element={<Deck />} />
      </Routes>
      <ChatBotWrapper />
    </BrowserRouter>
  );
}

export default App;
