
import React from "react";
import { Link } from "react-router-dom";
import { Laptop, Settings } from "lucide-react";

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ showText = true, size = 'medium' }: LogoProps) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-xl';
      case 'large':
        return 'text-4xl';
      default:
        return 'text-2xl';
    }
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 28 : 22;

  return (
    <Link to="/" className="flex items-center">
      <div className="relative">
        <div className="bg-tech-blue text-white rounded-lg p-1 flex items-center justify-center">
          <Laptop size={iconSize} />
        </div>
        <div className="absolute -right-1 -bottom-1 bg-tech-darkBlue text-white rounded-full p-0.5 flex items-center justify-center border border-white">
          <Settings size={iconSize / 2} />
        </div>
      </div>
      {showText && (
        <div className={`ml-2 font-bold ${getSizeClass()}`}>
          <span className="text-tech-blue">Compufy</span>
          <span className="text-tech-darkBlue">Investments</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
