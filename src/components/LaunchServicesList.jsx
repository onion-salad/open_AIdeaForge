import React from 'react';
import { ExternalLink, Twitter, Facebook, Linkedin, FileText, PenTool, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const launchServices = [
  { name: 'Twitter', url: 'https://twitter.com', icon: <Twitter className="h-5 w-5" /> },
  { name: 'Facebook', url: 'https://facebook.com', icon: <Facebook className="h-5 w-5" /> },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin className="h-5 w-5" /> },
  { name: 'PR Times', url: 'https://prtimes.jp', icon: <FileText className="h-5 w-5" /> },
  { name: 'Note', url: 'https://note.com', icon: <PenTool className="h-5 w-5" /> },
  { name: 'Product Hunt', url: 'https://www.producthunt.com', icon: <Search className="h-5 w-5" /> },
];

const LaunchServicesList = ({ onLinkClick }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('launchServices.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {launchServices.map((service) => (
          <a
            key={service.name}
            href={service.url}
            onClick={(e) => {
              e.preventDefault();
              if (typeof onLinkClick === 'function') {
                onLinkClick(service.url);
              }
            }}
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="flex items-center">
              {service.icon}
              <span className="ml-2">{service.name}</span>
            </span>
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LaunchServicesList;