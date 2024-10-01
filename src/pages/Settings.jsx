import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">{t('settings.title')}</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{t('settings.language')}</h2>
          <LanguageSwitcher />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;