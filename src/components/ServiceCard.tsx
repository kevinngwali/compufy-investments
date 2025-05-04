
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const ServiceCard = ({ title, description, icon: Icon, link }: ServiceCardProps) => {
  return (
    <Card className="border-gray-200 hover:border-tech-blue hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <CardHeader>
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-tech-blue/10 mb-4">
          <Icon className="text-tech-blue" size={24} />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="text-tech-blue hover:bg-tech-blue/10 p-0 h-auto" asChild>
          <Link to={link} className="flex items-center">
            Learn more <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
