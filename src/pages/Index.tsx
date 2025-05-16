import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Laptop, Network, Cctv, Code, Wifi, Monitor } from "lucide-react";

const Index = () => {
  const services = [
    {
      title: "Computer Repair",
      description: "Expert repairs for desktops and laptops with fast turnaround times.",
      icon: Laptop,
      link: "/services#repair",
    },
    {
      title: "Network Installation",
      description: "Professional network setup, maintenance, and troubleshooting services.",
      icon: Network,
      link: "/services#network",
    },
    {
      title: "CCTV Installation",
      description: "Secure your premises with high-quality CCTV systems and professional setup.",
      icon: Cctv,
      link: "/services#cctv",
    },
    {
      title: "Web Development",
      description: "Custom website design and development services for your business needs.",
      icon: Code,
      link: "/services#web",
    },
    {
      title: "Remote Assistance",
      description: "Quick technical support from anywhere with our remote assistance service.",
      icon: Wifi,
      link: "/services#remote",
    },
    {
      title: "Training and Consultancy",
      description: "Maximize your tech investment with our expert guidance and training programs.",
      icon: Monitor,
      link: "/services#training",
    },
  ];

  const testimonials = [
    {
      name: "Jane Cooper",
      role: "CEO",
      company: "ABC Industries",
      content: "TechOasis Solutions completely transformed our IT infrastructure. Their team was professional, knowledgeable, and incredibly efficient. Highly recommended!",
    },
    {
      name: "Michael Johnson",
      role: "Operations Manager",
      company: "XYZ Corp",
      content: "We've been working with TechOasis for over 3 years now. Their quick response time and technical expertise have saved us countless hours of downtime.",
    },
    {
      name: "Sarah Williams",
      role: "Small Business Owner",
      company: "Craft Café",
      content: "As a small business owner with limited technical knowledge, I'm grateful for TechOasis's patient explanations and affordable solutions tailored to my needs.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive IT solutions to meet all your technology needs,
                from hardware repairs to network installations and digital security.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" className="bg-tech-blue hover:bg-tech-darkBlue">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Products Preview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">IT Products & Accessories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer a wide range of high-quality IT products including laptops,
                desktops, printers, storage devices, and more at competitive prices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="heading-3 mb-4">Quality Products at Competitive Prices</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tech-blue/10 text-tech-blue mr-3">✓</span>
                    <span>Latest models of laptops and desktops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tech-blue/10 text-tech-blue mr-3">✓</span>
                    <span>Printers, scanners and multifunction devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tech-blue/10 text-tech-blue mr-3">✓</span>
                    <span>Storage solutions including SSDs and flash drives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tech-blue/10 text-tech-blue mr-3">✓</span>
                    <span>Networking equipment for home and business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tech-blue/10 text-tech-blue mr-3">✓</span>
                    <span>Security cameras and surveillance systems</span>
                  </li>
                </ul>
                <Button className="bg-tech-blue hover:bg-tech-darkBlue">
                  <Link to="/products">Browse Our Products</Link>
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                      alt="Laptop" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                      alt="Computer Hardware" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c" 
                      alt="Stylus Pen" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                      alt="Monitor" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">Why Choose Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                With years of experience in the IT industry, we pride ourselves on delivering 
                reliable, efficient, and affordable technology solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-tech-blue">20+</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Years Experience</h3>
                <p className="text-gray-600">Over two decades of IT industry expertise</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-tech-blue">500+</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Happy Clients</h3>
                <p className="text-gray-600">Trusted by hundreds of satisfied customers</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-tech-blue">24/7</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Support</h3>
                <p className="text-gray-600">Round-the-clock technical assistance</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-tech-blue">100%</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Satisfaction</h3>
                <p className="text-gray-600">Committed to exceeding your expectations</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about our services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  content={testimonial.content}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white">
                <Link to="/testimonials">View All Testimonials</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-tech-blue text-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-2 mb-6">Ready to solve your IT challenges?</h2>
              <p className="text-lg mb-8 text-blue-100">
                Contact us today for a free consultation and learn how we can help your business 
                leverage technology for greater success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-tech-blue hover:bg-gray-100">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
