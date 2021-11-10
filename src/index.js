import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataProvider } from './aplication/ContextData'
import { LogSignProvider } from './aplication/LogSignContext'


ReactDOM.render(
  <DataProvider>
    <LogSignProvider>
      <App />
    </LogSignProvider>
  </DataProvider>,
  document.getElementById('root')
);


