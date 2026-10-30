
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PackageOpen } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Add products here as they become available.
  // Each product needs: id, title, description, price, image, category, inStock.
  const products: Product[] = [];

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
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
              {products.length > 0 && (
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
              )}
            </div>
          </div>
        </section>

        {/* Products Listing */}
        <section className="py-16">
          <div className="container-custom">
            {products.length === 0 ? (
              <div className="text-center py-16 max-w-xl mx-auto">
                <PackageOpen className="mx-auto mb-6 text-tech-blue" size={56} />
                <h2 className="heading-3 text-tech-darkBlue mb-3">Products Coming Soon</h2>
                <p className="text-gray-600 mb-6">
                  We're currently updating our catalogue. In the meantime, contact us with what
                  you need — laptops, desktops, printers, accessories and more — and we'll get
                  you a competitive quote.
                </p>
                <Button className="bg-tech-blue hover:bg-tech-darkBlue" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            ) : (
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
            )}

            {/* Product Order Info */}
            <div className="mt-16 bg-blue-50 rounded-lg p-6">
              <h2 className="heading-3 text-tech-darkBlue mb-4">Need a Specific Product?</h2>
              <p className="mb-4">
                We can source and supply a wide range of IT products beyond what is listed here.
                Contact us for competitive quotes on any IT hardware or accessories you need.
              </p>
              <Button className="bg-tech-blue hover:bg-tech-darkBlue" asChild>
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
