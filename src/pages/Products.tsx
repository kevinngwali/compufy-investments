
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample product data - in a real app, this would come from an API
  const products = [
    {
      id: "laptop-1",
      title: "Business Ultrabook Pro",
      description: "High-performance laptop for professional use with 16GB RAM, 512GB SSD, and Intel i7 processor.",
      price: "$1,299.99",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      category: "Laptops",
      inStock: true
    },
    {
      id: "laptop-2",
      title: "Gaming Powerhouse X1",
      description: "Gaming laptop with NVIDIA RTX graphics, 32GB RAM, and high-refresh display.",
      price: "$1,899.99",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "Laptops",
      inStock: true
    },
    {
      id: "desktop-1",
      title: "Office Workstation Desktop",
      description: "Reliable desktop computer perfect for office tasks with ample storage and stable performance.",
      price: "$899.99",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Desktops",
      inStock: true
    },
    {
      id: "desktop-2",
      title: "Design & Media Creation Tower",
      description: "High-end desktop built for graphic design, video editing, and content creation.",
      price: "$1,599.99",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Desktops",
      inStock: false
    },
    {
      id: "printer-1",
      title: "Multi-Function Color Printer",
      description: "All-in-one printer, scanner, and copier with wireless connectivity and double-sided printing.",
      price: "$349.99",
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
      category: "Printers",
      inStock: true
    },
    {
      id: "storage-1",
      title: "Portable 2TB External SSD",
      description: "Ultra-fast portable SSD with USB-C connectivity and durable metal construction.",
      price: "$229.99",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      category: "Storage",
      inStock: true
    },
    {
      id: "network-1",
      title: "Wi-Fi 6 Mesh Router System",
      description: "Advanced mesh router system for whole-home coverage with the latest Wi-Fi 6 technology.",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Networking",
      inStock: true
    },
    {
      id: "security-1",
      title: "4K Dome Security Camera",
      description: "High-resolution security camera with night vision and motion detection capabilities.",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
      category: "Security",
      inStock: true
    }
  ];
  
  const categories = ["All", "Laptops", "Desktops", "Printers", "Storage", "Networking", "Security"];
  const [activeTab, setActiveTab] = useState("All");
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeTab === "All" || product.category === activeTab;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Products Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 text-tech-darkBlue mb-4">IT Products & Accessories</h1>
              <p className="text-lg text-gray-700 mb-8">
                Explore our range of high-quality computers, peripherals, and accessories to meet all your technology needs.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Listing */}
        <section className="py-16">
          <div className="container-custom">
            <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-100">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="data-[state=active]:bg-tech-blue data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map(product => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          title={product.title}
                          description={product.description}
                          price={product.price}
                          image={product.image}
                          category={product.category}
                          inStock={product.inStock}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No products found</h3>
                      <p className="text-gray-600 mb-4">We couldn't find any products matching your search criteria.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm('');
                          setActiveTab('All');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
            
            {/* Product Order Info */}
            <div className="mt-16 bg-blue-50 rounded-lg p-6">
              <h2 className="heading-3 text-tech-darkBlue mb-4">Need a Specific Product?</h2>
              <p className="mb-4">
                We can source and supply a wide range of IT products beyond what is listed here. 
                Contact us for competitive quotes on any IT hardware or accessories you need.
              </p>
              <Button className="bg-tech-blue hover:bg-tech-darkBlue">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Brands Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 text-tech-darkBlue mb-4">Trusted Brands We Carry</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We partner with leading technology manufacturers to bring you the highest quality products.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {["Dell", "HP", "Lenovo", "Apple", "Microsoft", "ASUS"].map(brand => (
                <div key={brand} className="flex items-center justify-center h-16">
                  <span className="text-xl font-bold text-gray-500">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
