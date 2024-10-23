import React from 'react';
import { ClockIcon, ExternalLinkIcon } from 'lucide-react';

interface Article {
  url: string;
  summary: string;
}

interface ArticleHistoryProps {
  articles: Article[];
}

const ArticleHistory: React.FC<ArticleHistoryProps> = ({ articles }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Article History</h2>
        {articles.length === 0 ? (
          <p className="text-gray-600">No articles have been shared yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map((article, index) => (
              <li key={index} className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        {article.url}
                        <ExternalLinkIcon className="ml-1 h-4 w-4 flex-shrink-0" />
                      </a>
                    </p>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.summary}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArticleHistory;