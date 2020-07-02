import React, { FunctionComponent } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
