import React, { createContext, useState, useContext } from 'react';

const SelectedServicesContext = createContext();

export const SelectedServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [notification, setNotification] = useState(null);

  const addService = (service) => {
    setSelectedServices((prev) => {
      if (!prev.some(s => s.id === service.id)) {
        setNotification("展開するサービスへ追加しました");
        setTimeout(() => setNotification(null), 3000);
        return [...prev, service];
      }
      return prev;
    });
  };

  return (
    <SelectedServicesContext.Provider value={{ selectedServices, addService, notification }}>
      {children}
    </SelectedServicesContext.Provider>
  );
};

export const useSelectedServices = () => useContext(SelectedServicesContext);