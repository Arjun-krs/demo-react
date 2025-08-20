import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MainRoutes from './Routes'
import 'mapbox-gl/dist/mapbox-gl.css';

import store from './Redux/store';
import { SidebarProvider } from './Context/SidebarContext';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SidebarProvider>
          <MainRoutes />
        </SidebarProvider>
      </BrowserRouter> 
    </Provider>
  )
}

export default App
