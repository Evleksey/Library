import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BrowserRouter } from "react-router-dom";
//import { ThemeProvider } from 'styled-components';

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client ={client}>    
    <BrowserRouter>
      <App />
    </BrowserRouter>    
  </QueryClientProvider>,
  
  document.getElementById('root')
);
