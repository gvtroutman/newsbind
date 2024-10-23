import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  article: {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
      name: string;
    };
    bias?: 'left' | 'center' | 'right';
  };
}

const getBiasColor = (bias?: 'left' | 'center' | 'right') => {
  switch (bias) {
    case 'left': return 'bg-blue-500';
    case 'right': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full">
      <div className="relative h-1/2">
        <img
          src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-8 relative">
        <div className="absolute -top-12 left-8 right-8 flex items-center justify-between">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg">
            {article.source.name}
          </span>
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg 
                        flex items-center space-x-2">
            <span>Bias:</span>
            <span className={`h-3 w-3 rounded-full ${getBiasColor(article.bias)}`} />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <motion.a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-900 font-medium hover:text-gray-600 transition-colors"
            whileHover={{ x: 4 }}
          >
            Read more
            <ChevronRight className="h-4 w-4 ml-1" />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;