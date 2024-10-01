import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

const ServiceList = ({ services, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">追加されたサービス</h2>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-blue-600">{service.url}</p>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(service.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;