import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleUploader from './ArticleUploader';
import ArticleCard from './ArticleCard';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  bias?: 'left' | 'center' | 'right';
}

const categories = ['Trending', 'World', 'Technology', 'Business', 'Entertainment', 'Health'];

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        const articlesWithBias = response.data.articles.map((article: Article) => ({
          ...article,
          bias: ['left', 'center', 'right'][Math.floor(Math.random() * 3)] as Article['bias']
        }));
        setArticles(articlesWithBias);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleUrlSubmit = async (url: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // In a real app, this would call your backend API to process the URL
      const mockArticle: Article = {
        title: 'New Article',
        description: 'This is a placeholder for the uploaded article content.',
        url: url,
        urlToImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop',
        publishedAt: new Date().toISOString(),
        source: { name: 'Uploaded Article' },
        bias: ['left', 'center', 'right'][Math.floor(Math.random() * 3)],
      };

      setArticles(prevArticles => [mockArticle, ...prevArticles]);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error processing URL:', error);
      throw error;
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSwipe = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < filteredArticles.length) {
      setCurrentIndex(newIndex);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Categories */}
      <div className="backdrop-blur-lg bg-white/90 sticky top-0 z-10 pb-4">
        <ArticleUploader onUrlSubmit={handleUrlSubmit} />
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search news..."
            className="block w-full pl-10 pr-4 py-3 border-0 rounded-2xl bg-white/50 shadow-sm 
                     focus:ring-2 focus:ring-gray-900 focus:outline-none backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                       ${activeCategory === category 
                         ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                         : 'bg-white/50 text-gray-600 hover:bg-gray-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards */}
      <div className="relative h-[600px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            {filteredArticles[currentIndex] && (
              <ArticleCard article={filteredArticles[currentIndex]} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          {currentIndex > 0 && (
            <button
              onClick={() => handleSwipe(-1)}
              className="pointer-events-auto p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg 
                       transform -translate-x-1/2 hover:bg-white transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {currentIndex < filteredArticles.length - 1 && (
            <button
              onClick={() => handleSwipe(1)}
              className="pointer-events-auto p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg 
                       transform translate-x-1/2 hover:bg-white transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filteredArticles.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;