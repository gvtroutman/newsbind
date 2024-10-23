import React from 'react';
import NewsFeed from '../components/NewsFeed';
import PluginStore from '../components/PluginStore';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <NewsFeed />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Plugins</h2>
        <PluginStore plugins={[]} onToggleInstallation={() => {}} />
      </div>
    </div>
  );
};

export default Home;