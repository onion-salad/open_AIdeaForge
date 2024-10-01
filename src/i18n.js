import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'home.title': 'Welcome to AIdeaForge',
      'home.availableServices': 'Available Services',
      'home.servicesToLaunch': 'Services to Launch',
      'home.openAllServices': 'Open All Services',
      'launchServices.title': 'Launch Services',
      'settings.title': 'Settings',
      'settings.language': 'Language',
      'notes.title': 'Notes, Tasks & Time Management',
      'notes.timeManagementMatrix': 'Time Management Matrix',
      'notes.listView': 'List View',
      'notes.addNewNote': 'Add a new note or task...',
      'notes.add': 'Add',
      'notes.importance': 'Importance',
      'notes.urgency': 'Urgency',
      'templateAndService.title': 'Manage Templates & Services',
      'templateAndService.templateTab': 'Templates',
      'templateAndService.serviceTab': 'Services',
      'templateAndService.templateName': 'Template Name',
      'templateAndService.selectServices': 'Select Services',
      'templateAndService.createTemplate': 'Create Template',
      'templateAndService.existingTemplates': 'Existing Templates',
      'templateAndService.services': 'Services',
      'templateAndService.serviceName': 'Service Name',
      'templateAndService.serviceUrl': 'Service URL',
      'templateAndService.serviceDescription': 'Service Description',
      'templateAndService.addService': 'Add Service',
      'templateAndService.existingServices': 'Existing Services',
      'templateAndService.selectService': 'Select a service',
      'templateAndService.remove': 'Remove',
    }
  },
  ja: {
    translation: {
      'home.title': 'AIdeaForge へようこそ',
      'home.availableServices': '利用可能なサービス',
      'home.servicesToLaunch': '展開するサービス',
      'home.openAllServices': 'すべてのサービスを開く',
      'launchServices.title': 'ローンチサービス',
      'settings.title': '設定',
      'settings.language': '言語',
      'notes.title': 'メモ、タスク＆時間管理',
      'notes.timeManagementMatrix': '時間管理マトリックス',
      'notes.listView': 'リスト表示',
      'notes.addNewNote': '新しいメモやタスクを追加...',
      'notes.add': '追加',
      'notes.importance': '重要度',
      'notes.urgency': '緊急度',
      'templateAndService.title': 'テンプレートとサービスの管理',
      'templateAndService.templateTab': 'テンプレート',
      'templateAndService.serviceTab': 'サービス',
      'templateAndService.templateName': 'テンプレート名',
      'templateAndService.selectServices': 'サービスを選択',
      'templateAndService.createTemplate': 'テンプレートを作成',
      'templateAndService.existingTemplates': '既存のテンプレート',
      'templateAndService.services': 'サービス',
      'templateAndService.serviceName': 'サービス名',
      'templateAndService.serviceUrl': 'サービスURL',
      'templateAndService.serviceDescription': 'サービスの説明',
      'templateAndService.addService': 'サービスを追加',
      'templateAndService.existingServices': '既存のサービス',
      'templateAndService.selectService': 'サービスを選択',
      'templateAndService.remove': '削除',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;