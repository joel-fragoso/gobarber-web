import React, { FunctionComponent } from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: FunctionComponent = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'Joel Fragoso' }}>
        <SignIn />
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  );
};

export default App;
