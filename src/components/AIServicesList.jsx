import React from 'react';
import { ExternalLink, MessageSquare, Bot, Code, PenTool, Cloud, Database, Zap } from 'lucide-react';

const categories = [
  {
    name: 'Conversational AI',
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
    services: [
      { name: 'ChatGPT', url: 'https://chat.openai.com/', icon: <MessageSquare className="h-4 w-4" /> },
      { name: 'Claude', url: 'https://www.anthropic.com/', icon: <Bot className="h-4 w-4" /> },
    ],
  },
  {
    name: 'AI Development',
    icon: <Code className="h-6 w-6 text-green-500" />,
    services: [
      { name: 'GPT-Engineer', url: 'https://gptengineer.app/', icon: <Code className="h-4 w-4" /> },
      { name: 'v0', url: 'https://v0.dev/', icon: <PenTool className="h-4 w-4" /> },
      { name: 'Cosor', url: 'https://www.cosor.com.tw/', icon: <Zap className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Backend Services',
    icon: <Database className="h-6 w-6 text-purple-500" />,
    services: [
      { name: 'Dify', url: 'https://dify.ai/', icon: <Database className="h-4 w-4" /> },
      { name: 'Supabase', url: 'https://supabase.com/', icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Cloud Services',
    icon: <Cloud className="h-6 w-6 text-orange-500" />,
    services: [
      { name: 'Google Cloud Console', url: 'https://console.cloud.google.com/', icon: <Cloud className="h-4 w-4" /> },
    ],
  },
];

const AIServicesList = ({ onLinkClick }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">AI Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              {category.icon}
              <h3 className="text-xl font-semibold ml-2">{category.name}</h3>
            </div>
            <ul className="space-y-2">
              {category.services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.url}
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof onLinkClick === 'function') {
                        onLinkClick(service.url);
                      }
                    }}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                  >
                    <span className="flex items-center">
                      {service.icon}
                      <span className="ml-2">{service.name}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIServicesList;