import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceList from '../components/ServiceList';
import TemplateForm from '../components/TemplateForm';
import ServiceForm from '../components/ServiceForm';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

const TemplateAndServiceManagement = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: services, isLoading: isLoadingServices, error: servicesError } = useQuery({
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

  const addTemplateMutation = useMutation({
    mutationFn: async (newTemplate) => {
      const { data, error } = await supabase.from('templates').insert([newTemplate]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('templates');
    },
  });

  const addServiceMutation = useMutation({
    mutationFn: async (newService) => {
      const { data, error } = await supabase.from('services').insert([newService]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('services');
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('templates').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('templates');
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('services');
    },
  });

  if (isLoadingServices || isLoadingTemplates) {
    return <div>Loading...</div>;
  }

  const renderError = (error) => (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>エラー</AlertTitle>
      <AlertDescription>
        {error.message}
      </AlertDescription>
    </Alert>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('templateAndService.title')}</h1>
        <Tabs defaultValue="template" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="template">{t('templateAndService.templateTab')}</TabsTrigger>
            <TabsTrigger value="service">{t('templateAndService.serviceTab')}</TabsTrigger>
          </TabsList>
          <TabsContent value="template">
            {templatesError ? (
              renderError(templatesError)
            ) : (
              <>
                <TemplateForm services={services} onSubmit={addTemplateMutation.mutate} />
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">作成したテンプレート</h2>
                  {templates && templates.map((template) => (
                    <div key={template.id} className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{template.name}</h3>
                        <p>{t('templateAndService.services')}: {template.template.length}</p>
                        <ul className="mt-2">
                          {template.template.map((service, index) => (
                            <li key={index} className="text-sm text-gray-600">{service}</li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTemplateMutation.mutate(template.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          <TabsContent value="service">
            {servicesError ? (
              renderError(servicesError)
            ) : (
              <>
                <ServiceForm onSubmit={addServiceMutation.mutate} />
                <ServiceList services={services} onDelete={deleteServiceMutation.mutate} />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TemplateAndServiceManagement;