
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-tech-blue text-2xl font-bold">TechOasis</span>
              <span className="text-tech-darkBlue font-medium ml-1">Solutions</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium ${
                  isActive(item.href)
                    ? 'text-tech-blue border-b-2 border-tech-blue'
                    : 'text-gray-600 hover:text-tech-blue transition-colors'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-tech-blue hover:bg-tech-darkBlue text-white">
              Get Support
            </Button>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-tech-blue"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium px-2 py-1 rounded ${
                    isActive(item.href)
                      ? 'text-tech-blue bg-gray-100'
                      : 'text-gray-600 hover:text-tech-blue hover:bg-gray-50 transition-colors'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="bg-tech-blue hover:bg-tech-darkBlue text-white w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                Get Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
