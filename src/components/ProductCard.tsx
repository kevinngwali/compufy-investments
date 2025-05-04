
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  inStock?: boolean;
  id: string;
}

const ProductCard = ({ title, description, price, image, category, inStock = true, id }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        {category && (
          <Badge className="absolute top-2 right-2 bg-tech-blue">{category}</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
        <CardDescription className="text-tech-blue font-medium">{price}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <span className={`text-sm ${inStock ? 'text-green-600' : 'text-red-500'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          <Button 
            variant={inStock ? 'default' : 'outline'} 
            disabled={!inStock}
            className={inStock ? 'bg-tech-blue hover:bg-tech-darkBlue' : ''}
            asChild
          >
            <Link to={`/products/${id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
