import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface UploadNotificationProps {
  type: 'success' | 'error';
  message: string;
  onDismiss: () => void;
}

const UploadNotification: React.FC<UploadNotificationProps> = ({ type, message, onDismiss }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`rounded-lg p-4 flex items-center justify-between ${
          type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}
      >
        <div className="flex items-center space-x-2">
          {type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadNotification;