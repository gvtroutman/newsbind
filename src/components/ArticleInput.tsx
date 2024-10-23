import React, { useState } from 'react';
import { SendIcon } from 'lucide-react';

interface ArticleInputProps {
  onSubmit: (url: string) => void;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter article URL"
        className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        required
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        <SendIcon className="h-5 w-5 mr-2" />
        Summarize
      </button>
    </form>
  );
};

export default ArticleInput;