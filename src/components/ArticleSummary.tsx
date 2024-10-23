import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';

interface ArticleSummaryProps {
  article: {
    url: string;
    summary: string;
  };
}

const ArticleSummary: React.FC<ArticleSummaryProps> = ({ article }) => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Article Summary
      </h3>
      <div className="mb-4">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <span className="truncate">{article.url}</span>
          <ExternalLinkIcon className="ml-2 h-4 w-4 flex-shrink-0" />
        </a>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-700 leading-relaxed">{article.summary}</p>
      </div>
    </div>
  );
};

export default ArticleSummary;