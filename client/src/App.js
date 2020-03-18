import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

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

const client = new ApolloClient({
  uri: 'http://localhost:4040/api/graphql'
});

export default () => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};
