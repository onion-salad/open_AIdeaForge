import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import ErrorBoundary from "./components/ErrorBoundary";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { SelectedServicesProvider } from './context/SelectedServicesContext';

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SelectedServicesProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  {navItems.map(({ to, page }) => (
                    <Route key={to} path={to} element={page} />
                  ))}
                </Routes>
              </BrowserRouter>
            </SelectedServicesProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
};

export default App;