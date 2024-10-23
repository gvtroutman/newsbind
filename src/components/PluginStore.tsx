import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, ExternalLinkIcon } from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  repoUrl: string;
  installed: boolean;
}

interface PluginStoreProps {
  plugins: Plugin[];
  onToggleInstallation: (pluginId: string) => void;
}

const PluginStore: React.FC<PluginStoreProps> = ({ plugins, onToggleInstallation }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Plugin Store</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="border rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="text-lg font-semibold text-gray-900">{plugin.name}</h3>
              <p className="text-sm text-gray-600 mb-2">by {plugin.author}</p>
              <p className="text-gray-700 mb-4">{plugin.description}</p>
              <div className="flex items-center justify-between">
                <a
                  href={plugin.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                >
                  View on GitHub
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </a>
                <button
                  onClick={() => onToggleInstallation(plugin.id)}
                  className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                    plugin.installed
                      ? 'text-red-700 bg-red-100 hover:bg-red-200'
                      : 'text-green-700 bg-green-100 hover:bg-green-200'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {plugin.installed ? (
                    <>
                      <MinusCircleIcon className="mr-1 h-4 w-4" />
                      Uninstall
                    </>
                  ) : (
                    <>
                      <PlusCircleIcon className="mr-1 h-4 w-4" />
                      Install
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PluginStore;