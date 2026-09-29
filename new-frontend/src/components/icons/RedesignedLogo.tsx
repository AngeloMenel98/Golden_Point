import Image from 'next/image';

interface RedesignedLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const RedesignedLogo: React.FC<RedesignedLogoProps> = ({ 
  width = 120, 
  height = 60, 
  className 
}) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/redesigned.png"
        alt="Golden Point"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default RedesignedLogo;