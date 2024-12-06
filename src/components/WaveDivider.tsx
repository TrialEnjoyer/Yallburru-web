import Image from 'next/image';

const WaveDivider = () => {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -bottom-4 md:bottom-0 transform -translate-x-1/2">
        <Image 
          src="/Logo.webp" 
          alt="Yallburru Community Services Banner" 
          className="rounded-full shadow-lg" 
          width={100} 
          height={100} 
          priority
        />
      </div>
      <svg
        viewBox="0 0 1440 200"
        className="w-full h-20 md:h-48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgb(249, 250, 251)"
          fillOpacity="1"
        />
      </svg>
    </div>
  );
};

export default WaveDivider; 