import React from 'react';
import { motion } from 'framer-motion';

interface UploadProgressProps {
  progress: number;
  status: string;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress, status }) => {
  const dots = Array.from({ length: 5 });
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="flex space-x-1">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <span className="text-sm font-medium">
        {progress < 100 ? `${progress}%` : status}
      </span>
    </div>
  );
};

export default UploadProgress;