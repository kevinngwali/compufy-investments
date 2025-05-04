
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-6">
              <Logo size="large" />
            </div>
            <h1 className="heading-1 text-tech-darkBlue mb-4">
              Expert IT Support for<br className="hidden sm:block" />
              <span className="text-tech-blue">Your Business</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Comprehensive IT solutions including computer repairs, network installation, 
              CCTV systems, web development, and remote technical support. Your one-stop 
              technology partner.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-tech-blue hover:bg-tech-darkBlue text-white">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-r from-tech-blue to-tech-lightBlue opacity-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="IT Support Professional" 
              className="rounded-lg shadow-xl relative z-10 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
