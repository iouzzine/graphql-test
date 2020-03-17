import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
// import Landing from './components/Pages/Landing';

// Theme
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import Theme from './palette/Theme';

// Css
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Navbar />
          <Container>
            <main>
              <h2>Test</h2>
            </main>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};
