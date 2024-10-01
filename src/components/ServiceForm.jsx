import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Code, Database, Cloud, Zap } from 'lucide-react';

const genres = [
  { value: 'Conversational AI', icon: <MessageSquare className="h-4 w-4" /> },
  { value: 'AI Development', icon: <Code className="h-4 w-4" /> },
  { value: 'Backend Services', icon: <Database className="h-4 w-4" /> },
  { value: 'Cloud Services', icon: <Cloud className="h-4 w-4" /> },
  { value: 'Launch Services', icon: <Zap className="h-4 w-4" /> },
];

const ServiceForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, url, description, genre });
    setName('');
    setUrl('');
    setDescription('');
    setGenre('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
          {t('templateAndService.serviceName')}
        </label>
        <Input
          id="serviceName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="serviceUrl" className="block text-sm font-medium text-gray-700">
          {t('templateAndService.serviceUrl')}
        </label>
        <Input
          id="serviceUrl"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">
          {t('templateAndService.serviceDescription')}
        </label>
        <Textarea
          id="serviceDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="serviceGenre" className="block text-sm font-medium text-gray-700">
          ジャンル
        </label>
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger>
            <SelectValue placeholder="ジャンルを選択" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genreOption) => (
              <SelectItem key={genreOption.value} value={genreOption.value}>
                <div className="flex items-center">
                  {genreOption.icon}
                  <span className="ml-2">{genreOption.value}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{t('templateAndService.addService')}</Button>
    </form>
  );
};

export default ServiceForm;