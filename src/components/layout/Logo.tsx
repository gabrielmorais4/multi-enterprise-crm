
import React from 'react';
import { Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 px-6 py-4">
      <Box className="h-6 w-6 text-white" />
      <span className="font-bold text-xl text-white">GestãoPro</span>
    </Link>
  );
};

export default Logo;
