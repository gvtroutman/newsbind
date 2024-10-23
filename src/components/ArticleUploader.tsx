import React, { useState } from 'react';
import { LinkIcon, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadProgress from './UploadProgress';
import UploadNotification from './UploadNotification';

interface ArticleUploaderProps {
  onUrlSubmit: (url: string) => Promise<void>;
}

interface UploadState {
  progress: number;
  status: string;
  notification?: {
    type: 'success' | 'error';
    message: string;
  };
}

const ArticleUploader: React.FC<ArticleUploaderProps> = ({ onUrlSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [url, setUrl] = useState('');
  const [uploadState, setUploadState] = useState<UploadState>({
    progress: 0,
    status: 'Ready',
  });

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) {
        clearInterval(interval);
        progress = 90;
      }
      setUploadState(state => ({
        ...state,
        progress: Math.min(Math.round(progress), 90),
        status: 'Processing article...',
      }));
    }, 200);
    return interval;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setUploadState({
      progress: 0,
      status: 'Starting upload...',
    });

    const progressInterval = simulateProgress();

    try {
      await onUrlSubmit(url.trim());
      clearInterval(progressInterval);
      setUploadState({
        progress: 100,
        status: 'Complete',
        notification: {
          type: 'success',
          message: 'Article processed successfully',
        },
      });
      setTimeout(() => {
        setUrl('');
        setIsExpanded(false);
        setUploadState({ progress: 0, status: 'Ready' });
      }, 1500);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadState({
        progress: 0,
        status: 'Failed',
        notification: {
          type: 'error',
          message: 'Failed to process article. Please try again.',
        },
      });
    }
  };

  const dismissNotification = () => {
    setUploadState(state => ({ ...state, notification: undefined }));
  };

  const isUploading = uploadState.progress > 0 && uploadState.progress < 100;

  return (
    <div className="mb-6 space-y-4">
      <button
        onClick={() => !isUploading && setIsExpanded(!isExpanded)}
        className={`w-full py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center
                   transition-all duration-300 ${
                     isUploading
                       ? 'bg-gray-600 cursor-not-allowed'
                       : 'bg-gray-900 hover:bg-gray-800'
                   } text-white`}
      >
        {isUploading ? (
          <UploadProgress
            progress={uploadState.progress}
            status={uploadState.status}
          />
        ) : (
          <>
            <Upload className="h-5 w-5 mr-2" />
            Add Article
          </>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Paste article URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isUploading}
                className={`block w-full pl-10 pr-24 py-3 border-0 rounded-2xl bg-white shadow-sm 
                         focus:ring-2 focus:ring-gray-900 focus:outline-none
                         ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                required
              />
              <button
                type="submit"
                disabled={isUploading || !url.trim()}
                className={`absolute inset-y-1 right-1 px-4 rounded-xl
                         transition-colors duration-200 flex items-center
                         ${
                           isUploading || !url.trim()
                             ? 'bg-gray-300 cursor-not-allowed'
                             : 'bg-gray-900 hover:bg-gray-800 text-white'
                         }`}
              >
                Process
              </button>
            </div>

            {uploadState.notification && (
              <UploadNotification
                type={uploadState.notification.type}
                message={uploadState.notification.message}
                onDismiss={dismissNotification}
              />
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleUploader;