import { Link } from "react-router-dom";
import logoAsset from "@/assets/compufy-logo-stack.png.asset.json";

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ showText = false, size = 'medium' }: LogoProps) => {
  const heightClass =
    size === 'small' ? 'h-12' : size === 'large' ? 'h-32' : 'h-20';

  return (
    <Link to="/" className="flex items-center" aria-label="Compufy Investments home">
      <img
        src={logoAsset.url}
        alt="Compufy Investments"
        className={`${heightClass} w-auto select-none`}
        draggable={false}
      />
      {showText && (
        <span className="sr-only">Compufy Investments</span>
      )}
    </Link>
  );
};

export default Logo;
