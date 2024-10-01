import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MessageSquare, Bot, Code, PenTool, Cloud, Database, Zap, Twitter, Facebook, Linkedin, FileText, Search } from 'lucide-react';

const genreIcons = {
  'Conversational AI': <MessageSquare className="h-6 w-6" />,
  'AI Development': <Code className="h-6 w-6" />,
  'Backend Services': <Database className="h-6 w-6" />,
  'Cloud Services': <Cloud className="h-6 w-6" />,
  'Launch Services': <Zap className="h-6 w-6" />,
};

const serviceIcons = {
  'ChatGPT': <MessageSquare className="h-4 w-4" />,
  'Claude': <Bot className="h-4 w-4" />,
  'GPT-Engineer': <Code className="h-4 w-4" />,
  'v0': <PenTool className="h-4 w-4" />,
  'Cosor': <Code className="h-4 w-4" />,
  'create': <PenTool className="h-4 w-4" />,
  'Dify': <Database className="h-4 w-4" />,
  'Supabase': <Database className="h-4 w-4" />,
  'Google Cloud Console': <Cloud className="h-4 w-4" />,
  'Twitter': <Twitter className="h-4 w-4" />,
  'Facebook': <Facebook className="h-4 w-4" />,
  'LinkedIn': <Linkedin className="h-4 w-4" />,
  'PR Times': <FileText className="h-4 w-4" />,
  'Product Hunt': <Search className="h-4 w-4" />,
  'Note': <FileText className="h-4 w-4" />,
  'Udemy': <FileText className="h-4 w-4" />,
};

const genreColors = {
  'Conversational AI': 'bg-blue-50',
  'AI Development': 'bg-green-50',
  'Backend Services': 'bg-purple-50',
  'Cloud Services': 'bg-orange-50',
  'Launch Services': 'bg-yellow-50',
};

const defaultServices = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', genre: 'Conversational AI' },
  { id: 'claude', name: 'Claude', url: 'https://www.anthropic.com/', genre: 'Conversational AI' },
  { id: 'gpt-engineer', name: 'GPT-Engineer', url: 'https://gptengineer.app/', genre: 'AI Development' },
  { id: 'v0', name: 'v0', url: 'https://v0.dev/', genre: 'AI Development' },
  { id: 'cosor', name: 'Cosor', url: 'https://www.cosor.com.tw/', genre: 'AI Development' },
  { id: 'create', name: 'create', url: 'https://www.create.xyz/dashboard/team/6db2f50b-c16c-44a4-afb7-941cc9cb2834', genre: 'AI Development' },
  { id: 'dify', name: 'Dify', url: 'https://dify.ai/', genre: 'Backend Services' },
  { id: 'supabase', name: 'Supabase', url: 'https://supabase.com/', genre: 'Backend Services' },
  { id: 'google-cloud', name: 'Google Cloud Console', url: 'https://console.cloud.google.com/', genre: 'Cloud Services' },
  { id: 'twitter', name: 'Twitter', url: 'https://twitter.com', genre: 'Launch Services' },
  { id: 'facebook', name: 'Facebook', url: 'https://facebook.com', genre: 'Launch Services' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com', genre: 'Launch Services' },
  { id: 'prtimes', name: 'PR Times', url: 'https://prtimes.jp', genre: 'Launch Services' },
  { id: 'producthunt', name: 'Product Hunt', url: 'https://www.producthunt.com', genre: 'Launch Services' },
  { id: 'note', name: 'Note', url: 'https://note.com', genre: 'Launch Services' },
  { id: 'udemy', name: 'Udemy', url: 'https://www.udemy.com/', genre: 'Launch Services' },
];

const TemplateForm = ({ services, onSubmit }) => {
  const { t } = useTranslation();
  const [templateName, setTemplateName] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const allServices = [...new Set([...defaultServices, ...(services || [])])];

  const groupedServices = allServices.reduce((acc, service) => {
    if (!acc[service.genre]) {
      acc[service.genre] = [];
    }
    acc[service.genre].push(service);
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: templateName,
      template: selectedServices,
    });
    setTemplateName('');
    setSelectedServices([]);
  };

  const handleServiceToggle = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="templateName" className="text-sm font-medium text-gray-700">
          {t('templateAndService.templateName')}
        </Label>
        <Input
          id="templateName"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">{t('templateAndService.selectServices')}</h3>
        <div className="space-y-4">
          {Object.entries(groupedServices).map(([genre, services]) => (
            <div key={genre} className={`p-4 rounded-lg ${genreColors[genre]}`}>
              <h4 className="text-md font-semibold mb-2 flex items-center">
                {genreIcons[genre]}
                <span className="ml-2">{genre}</span>
              </h4>
              <div className="space-y-2">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={selectedServices.includes(service.name)}
                      onCheckedChange={() => handleServiceToggle(service.name)}
                    />
                    <Label
                      htmlFor={`service-${service.id}`}
                      className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {serviceIcons[service.name] || <PenTool className="h-4 w-4" />}
                      <span>{service.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit">{t('templateAndService.createTemplate')}</Button>
    </form>
  );
};

export default TemplateForm;