import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const location = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const serviceParam = searchParams.get('service');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceParam || "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will get back to you soon.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Contact Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 text-tech-darkBlue mb-4">Contact Us</h1>
              <p className="text-lg text-gray-700">
                Have questions or need assistance? Our team is here to help you with all your IT needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-tech-blue/10">
                  <Phone className="text-tech-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-600 mb-2">Mon-Fri: 8am - 6pm</p>
                <a href="tel:+263772752393" className="text-tech-blue font-medium">+263772752393 / +263712125999</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-tech-blue/10">
                  <Mail className="text-tech-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-600 mb-2">24/7 Support</p>
                <a href="mailto:compufyinvestments@gmail.com" className="text-tech-blue font-medium">compufyinvestments@gmail.com</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-tech-blue/10">
                  <MapPin className="text-tech-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">We offer call-out services at a standard fare</h3>
                <a href="tel:+263772752393" className="block text-tech-blue font-medium">+263772752393</a>
                <a
                  href="https://wa.me/263772752393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-tech-blue font-medium mt-1"
                >
                  <MessageCircle size={16} /> WhatsApp us
                </a>

              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="heading-2 text-tech-darkBlue mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Interested In
                    </label>
                    <Select value={formData.service} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="repair">Computer Repair</SelectItem>
                        <SelectItem value="network">Network Installation</SelectItem>
                        <SelectItem value="cctv">CCTV Installation</SelectItem>
                        <SelectItem value="web">Website Development</SelectItem>
                        <SelectItem value="remote">Remote Assistance</SelectItem>
                        <SelectItem value="training">Training and Consultancy</SelectItem>
                        <SelectItem value="products">Product Purchase</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-tech-blue hover:bg-tech-darkBlue" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              {/* Map */}
              <div>
                <h2 className="heading-2 text-tech-darkBlue mb-6">Our Location</h2>
                <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
                  {/* In a real implementation, replace this with an actual map */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center p-6">
                      <MapPin className="mx-auto mb-4 text-tech-blue" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Compufy Investments</h3>
                      <p className="text-gray-600">
                        We offer call-out services at a standard fare

                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Here are some common questions about our services and support process.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    question: "How quickly can you respond to an IT emergency?",
                    answer: "We prioritize emergencies and typically respond within 1-2 hours for critical issues. Our team is on call 24/7 for emergency situations to minimize your downtime."
                  },
                  {
                    question: "Do you offer maintenance contracts?",
                    answer: "Yes, we offer flexible maintenance contracts tailored to your business needs. These include regular system checks, updates, and priority support to keep your systems running smoothly."
                  },
                  {
                    question: "Can you support remote workers?",
                    answer: "Absolutely. We specialize in setting up secure remote work solutions, including VPNs, cloud services, and remote desktop support to keep your team productive from anywhere."
                  },
                  {
                    question: "What areas do you service?",
                    answer: "We provide on-site support within a 50-mile radius of our office and remote support services nationwide. For clients outside our on-site service area, we offer comprehensive remote assistance."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
