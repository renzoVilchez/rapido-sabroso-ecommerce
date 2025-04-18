import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu/index';
import MenuClasicas from './pages/Menu/MenuClasicas';
import MenuQuesos from './pages/Menu/MenuQuesos';
import MenuPicantes from './pages/Menu/MenuPicantes';
import MenuAlternativas from './pages/Menu/MenuAlternativas';
import Blog from './pages/Blog/Index';
import BlogHistoria from './pages/Blog/BlogHistoria';
import BlogAcompanamientos from './pages/Blog/BlogAcompanamientos';
import BlogBeneficios from './pages/Blog/BlogBeneficios';
import BlogCuriosidades from './pages/Blog/BlogCuriosidades';
import BlogNovedades from './pages/Blog/BlogNovedades';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros/index';
import NosotrosMision from './pages/Nosotros/NosotrosMision';
import NosotrosVision from './pages/Nosotros/NosotrosVision';
import NosotrosObjetivos from './pages/Nosotros/NosotrosObjetivos';
import NosotrosValores from './pages/Nosotros/NosotrosValores';
import Ayuda from './pages/Ayuda/index';
import AyudaManual from './pages/Ayuda/AyudaManual';
import AyudaOpinion from './pages/Ayuda/AyudaOpinion';
import Navbar from './components/Navbar';  
import NotFound from './pages/NotFound'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/clasicas" element={<MenuClasicas />} />
          <Route path="/menu/quesos" element={<MenuQuesos />} />
          <Route path="/menu/picantes" element={<MenuPicantes />} />
          <Route path="/menu/alternativas" element={<MenuAlternativas />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/historia" element={<BlogHistoria />} />
          <Route path="/blog/acompanamientos" element={<BlogAcompanamientos />} />
          <Route path="/blog/beneficios" element={<BlogBeneficios />} />
          <Route path="/blog/curiosidades" element={<BlogCuriosidades />} />
          <Route path="/blog/novedades" element={<BlogNovedades />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/nosotros/" element={<Nosotros />} />
          <Route path="/nosotros/mision" element={<NosotrosMision />} />
          <Route path="/nosotros/vision" element={<NosotrosVision />} />
          <Route path="/nosotros/objetivos" element={<NosotrosObjetivos />} />
          <Route path="/nosotros/valores" element={<NosotrosValores />} />

          <Route path="/ayuda/" element={<Ayuda />} />
          <Route path="/ayuda/manual" element={<AyudaManual />} />
          <Route path="/ayuda/opinion" element={<AyudaOpinion />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;