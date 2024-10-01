import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { ExternalLink, MessageSquare, Bot, Code, PenTool, Cloud, Database, Zap, Twitter, Facebook, Linkedin, FileText, Search, Trash2 } from 'lucide-react';
import { useMemos } from '../integrations/supabase';
import TaskSuggestions from '../components/TaskSuggestions';
import { supabase } from '../integrations/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const serviceIcons = {
  'Conversational AI': <MessageSquare className="h-6 w-6 text-blue-500" />,
  'AI Development': <Code className="h-6 w-6 text-green-500" />,
  'Backend Services': <Database className="h-6 w-6 text-purple-500" />,
  'Cloud Services': <Cloud className="h-6 w-6 text-orange-500" />,
  'Launch Services': <Zap className="h-6 w-6 text-yellow-500" />,
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

const Index = () => {
  const { t } = useTranslation();
  const [selectedServices, setSelectedServices] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const { data: memos } = useMemos();

  const { data: customServices, isLoading: isLoadingServices, error: servicesError } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: templates, isLoading: isLoadingTemplates, error: templatesError } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data, error } = await supabase.from('templates').select('*');
      if (error) throw error;
      return data;
    },
  });

  const allServices = [...defaultServices, ...(customServices || [])];

  const groupedServices = allServices.reduce((acc, service) => {
    if (!acc[service.genre]) {
      acc[service.genre] = [];
    }
    acc[service.genre].push(service);
    return acc;
  }, {});

  const handleServiceClick = (service) => {
    if (!selectedServices.some(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, { ...service, task: '' }]);
    }
  };

  const removeService = (id) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };

  const updateServiceTask = (id, task) => {
    setSelectedServices(selectedServices.map(service =>
      service.id === id ? { ...service, task } : service
    ));
  };

  const openAllServices = () => {
    selectedServices.forEach(service => {
      window.open(service.url, '_blank');
    });
  };

  const handleInputFocus = (id) => {
    setShowSuggestions(true);
    setActiveServiceId(id);
  };

  const handleSuggestionSelect = (suggestion) => {
    updateServiceTask(activeServiceId, suggestion);
    setShowSuggestions(false);
  };

  const getFilteredSuggestions = (serviceId) => {
    const service = selectedServices.find(s => s.id === serviceId);
    if (!service) return [];
    return memos?.filter(memo => 
      memo.memo && memo.memo[0] && memo.memo[0].tool === service.name
    ).map(memo => memo.memo[0].text) || [];
  };

  const loadTemplate = async (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    const templateServices = template.template.map(serviceName => {
      return allServices.find(s => s.name === serviceName);
    }).filter(Boolean);

    setSelectedServices(prevServices => {
      const newServices = [...prevServices];
      templateServices.forEach(service => {
        if (!newServices.some(s => s.id === service.id)) {
          newServices.push({ ...service, task: '' });
        }
      });
      return newServices;
    });
  };

  if (isLoadingServices || isLoadingTemplates) return <div>Loading...</div>;
  if (servicesError || templatesError) return <div>Error: {servicesError?.message || templatesError?.message}</div>;

  return (
    <Layout>
      <div className="flex h-full">
        <div className="w-1/2 p-4 bg-gray-100 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          <h2 className="text-xl font-semibold mb-4">{t('home.availableServices')}</h2>
          {Object.entries(groupedServices).map(([genre, services]) => (
            <div key={genre} className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                {serviceIcons[genre]}
                <span className="ml-2">{genre}</span>
              </h3>
              <div className="space-y-2">
                {services.map(service => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
                    onClick={() => handleServiceClick(service)}
                  >
                    <span className="flex items-center">
                      {serviceIcons[service.genre]}
                      <span className="ml-2">{service.name}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">{t('home.servicesToLaunch')}</h2>
          <div className="mb-4">
            <Select onValueChange={loadTemplate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="テンプレートを選択" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            {selectedServices.map(service => (
              <div key={service.id} className="p-2 bg-gray-100 rounded flex items-center justify-between">
                <div className="flex items-center flex-grow mr-2">
                  {serviceIcons[service.genre]}
                  <span className="ml-2">{service.name}</span>
                </div>
                <div className="relative flex-grow mx-2">
                  <Input
                    value={service.task}
                    onChange={(e) => updateServiceTask(service.id, e.target.value)}
                    onFocus={() => handleInputFocus(service.id)}
                    placeholder="Enter task"
                    className="w-full"
                  />
                  {showSuggestions && activeServiceId === service.id && (
                    <div className="absolute z-10 w-full mt-1">
                      <TaskSuggestions
                        suggestions={getFilteredSuggestions(service.id)}
                        onSelect={handleSuggestionSelect}
                      />
                    </div>
                  )}
                </div>
                <button onClick={() => removeService(service.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={openAllServices} className="mt-4">
            {t('home.openAllServices')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;