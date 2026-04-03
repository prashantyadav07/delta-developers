import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { Toaster } from 'sonner';

export const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <SmoothScrollProvider>
        <BrowserRouter>
          {children}
          <Toaster position="bottom-right" theme="light" />
        </BrowserRouter>
      </SmoothScrollProvider>
    </HelmetProvider>
  );
};
