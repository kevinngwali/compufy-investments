import { Link } from "react-router-dom";
import logoAsset from "@/assets/compufy-logo-h.png.asset.json";

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ showText = false, size = 'medium' }: LogoProps) => {
  const heightClass =
    size === 'small' ? 'h-10' : size === 'large' ? 'h-28' : 'h-16';

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
