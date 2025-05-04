
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* About Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 text-tech-darkBlue mb-4">About Compufy Investments</h1>
              <p className="text-lg text-gray-700">
                Your trusted partner in IT support and technology solutions since 2003.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 text-tech-darkBlue mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Compufy Investments was founded in 2003 with a simple mission: to provide reliable, 
                  user-friendly IT support to businesses and individuals who needed technology expertise 
                  without the technical jargon and complicated processes.
                </p>
                <p className="text-gray-700 mb-4">
                  What began as a small computer repair shop has grown into a comprehensive IT service 
                  provider, helping hundreds of clients navigate their technology challenges and leverage 
                  digital tools for success.
                </p>
                <p className="text-gray-700">
                  Today, we offer a wide range of services from hardware repairs and network installations 
                  to security solutions and custom software development. Through it all, we've maintained our 
                  commitment to personalized service, clear communication, and customer satisfaction.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                  alt="Compufy Investments Team" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">Our Mission & Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're driven by a set of core principles that guide everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-tech-blue text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every project, from the smallest repair to the most complex 
                  network implementation. Quality is never compromised.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-tech-blue text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We operate with complete transparency and honesty. Our recommendations are always based on 
                  what's best for the client, not what's most profitable for us.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-tech-blue text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Technology is constantly evolving, and so are we. We continuously update our skills and 
                  knowledge to provide cutting-edge solutions to modern challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our experienced professionals are the backbone of our success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                {name: "John Smith", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"},
                {name: "Sarah Johnson", role: "Technical Director", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"},
                {name: "Michael Lee", role: "Network Specialist", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"},
                {name: "Emma Wilson", role: "Web Developer", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-tech-blue text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 mb-6">Let's Work Together</h2>
              <p className="text-lg mb-8 text-blue-100">
                Whether you're facing a technical challenge or looking to upgrade your IT infrastructure, 
                our team is ready to help you achieve your technology goals.
              </p>
              <Button size="lg" className="bg-white text-tech-blue hover:bg-gray-100">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
