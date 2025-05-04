
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-9xl font-bold text-tech-blue mb-4">404</h1>
            <h2 className="heading-2 mb-6">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-tech-blue hover:bg-tech-darkBlue">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
