// components/Layout.jsx
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto bg-yellow-50">
      <Navbar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;