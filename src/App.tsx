import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/assets/styles/global-styles';
import theme from '@/assets/styles/theme';
import RouterView from '@/router';
import ModalContainer from '@/views/components/common/modal/ModalContainer';
import DialogContainer from '@/views/components/common/dialog/DialogContainer';
import ToastContainer from '@/views/components/common/toast/ToastContainer';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterView />
      <ModalContainer />
      <DialogContainer />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App;
