import React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const GradientHeading: React.FC<GradientHeadingProps> = ({ children, className = '' }) => {
  return (
    <h2 className={`text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ${className}`}>
      {children}
    </h2>
  );
};

export default GradientHeading;