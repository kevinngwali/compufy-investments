
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Compufy Investments</h3>
            <p className="text-gray-300 mb-4">Your reliable partner for all IT support needs. We provide comprehensive solutions for businesses and individuals.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#repair" className="text-gray-300 hover:text-white transition-colors">Computer Repair</Link>
              </li>
              <li>
                <Link to="/services#network" className="text-gray-300 hover:text-white transition-colors">Network Installation</Link>
              </li>
              <li>
                <Link to="/services#cctv" className="text-gray-300 hover:text-white transition-colors">CCTV Installation</Link>
              </li>
              <li>
                <Link to="/services#web" className="text-gray-300 hover:text-white transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services#remote" className="text-gray-300 hover:text-white transition-colors">Remote Assistance</Link>
              </li>
              <li>
                <Link to="/services#training" className="text-gray-300 hover:text-white transition-colors">Training and Consultancy</Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={20} className="mr-3 flex-shrink-0 mt-1" />
                <span>+263772752393 / +263712125999</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-3 flex-shrink-0 mt-1" />
                <span>support@compufyinvestments.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 flex-shrink-0 mt-1" />
                <span>123 Tech Street, IT Park, Digital City, 10101</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2023 Compufy Investments. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
