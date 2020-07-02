import React, { FunctionComponent } from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: FunctionComponent = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
