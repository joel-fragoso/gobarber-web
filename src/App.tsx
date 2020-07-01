import React, { FunctionComponent } from 'react';

import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: FunctionComponent = () => {
  return (
    <>
      <SignIn />
      <GlobalStyle />
    </>
  );
};

export default App;
