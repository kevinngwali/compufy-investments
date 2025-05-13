import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Laptop, Network, Cctv, Code, Wifi, Monitor } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "repair",
      title: "Computer Repair",
      description: "Our expert technicians specialize in diagnosing and repairing all types of desktop and laptop issues. From hardware failures to software troubleshooting, we provide efficient, reliable repair services with quick turnaround times.",
      icon: Laptop,
      features: [
        "Hardware troubleshooting and repair",
        "Operating system installation and recovery",
        "Virus and malware removal",
        "Data recovery and backup solutions",
        "Performance optimization",
        "Component upgrades"
      ],
      image: "/lovable-uploads/ca0fca17-1fb7-4741-82ef-57ca2211043f.png"
    },
    {
      id: "network",
      title: "Network Installation",
      description: "We design, install, and maintain secure, reliable networks for businesses of all sizes. Our network solutions are tailored to your specific needs, ensuring optimal performance, security, and scalability.",
      icon: Network,
      features: [
        "Wired and wireless network setup",
        "Network security implementation",
        "Router and switch configuration",
        "Network monitoring and management",
        "VPN setup and configuration",
        "Network troubleshooting and optimization"
      ],
      image: "/lovable-uploads/505d9921-3622-46ea-afa5-f49988754cb1.png"
    },
    {
      id: "cctv",
      title: "CCTV Installation",
      description: "Protect your property with our professional CCTV installation services. We offer comprehensive surveillance solutions with high-quality cameras, proper positioning, and reliable recording systems to keep your premises secure.",
      icon: Cctv,
      features: [
        "High-definition camera installation",
        "Digital video recorders (DVR) setup",
        "Remote viewing setup on mobile devices",
        "Motion detection configuration",
        "Night vision camera installation",
        "Maintenance and support services"
      ],
      image: "/lovable-uploads/d5ca222b-3fc2-4ac5-b12d-437096b9d2c9.png"
    },
    {
      id: "web",
      title: "Website Development",
      description: "Our web development team creates responsive, user-friendly websites tailored to your business needs. From simple brochure sites to complex e-commerce platforms, we deliver custom web solutions that help you achieve your online objectives.",
      icon: Code,
      features: [
        "Custom website design and development",
        "Responsive design for all devices",
        "E-commerce website development",
        "Content management system setup",
        "SEO-friendly website structure",
        "Website maintenance and support"
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: "remote",
      title: "Remote Assistance",
      description: "Get immediate help with our remote assistance services. Our technicians can securely access your computer to diagnose and fix issues without the need for an on-site visit, saving you time and minimizing disruption.",
      icon: Wifi,
      features: [
        "Secure remote desktop support",
        "Quick issue resolution",
        "Software installation and configuration",
        "System updates and maintenance",
        "Performance optimization",
        "Training and guidance via screen sharing"
      ],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    },
    {
      id: "training",
      title: "Product Training",
      description: "Maximize your investment in technology with our comprehensive training programs. We provide hands-on instruction for various software applications, hardware usage, and IT systems to ensure your team can efficiently utilize your technology.",
      icon: Monitor,
      features: [
        "Customized training programs",
        "One-on-one and group sessions",
        "Software application training",
        "Hardware operation instruction",
        "Security awareness training",
        "Advanced system administration training"
      ],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Services Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 text-tech-darkBlue mb-4">Our IT Services</h1>
              <p className="text-lg text-gray-700 mb-8">
                From hardware repairs to network solutions and digital security, we offer comprehensive IT services to keep your technology running smoothly.
              </p>
              <Button size="lg" className="bg-tech-blue hover:bg-tech-darkBlue text-white">
                <Link to="/contact">Request a Service</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Individual Services */}
        {services.map((service, index) => (
          <section 
            key={service.id} 
            id={service.id}
            className={`py-16 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="container-custom">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'order-1 lg:order-2' : 'order-1'}>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-tech-blue flex items-center justify-center mr-3 flex-shrink-0">
                      <service.icon className="text-white" size={20} />
                    </div>
                    <h2 className="heading-2 text-tech-darkBlue">{service.title}</h2>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {service.description}
                  </p>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">What We Offer</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tech-blue/10 text-tech-blue mr-3 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="bg-tech-blue hover:bg-tech-darkBlue text-white">
                    <Link to={`/contact?service=${service.id}`}>Inquire About This Service</Link>
                  </Button>
                </div>
                <div className={index % 2 === 1 ? 'order-2 lg:order-1' : 'order-2'}>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        
        {/* CTA Section */}
        <section className="py-16 bg-tech-blue text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 mb-6">Need a customized IT solution?</h2>
              <p className="text-lg mb-8 text-blue-100">
                We understand that every business has unique technology needs. Contact us for a 
                consultation and let's create a tailored IT strategy for your organization.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-tech-blue hover:bg-gray-100">
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/about">Learn About Our Process</Link>
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

export default Services;
