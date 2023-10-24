import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline';


ReactDOM.createRoot(document.getElementById("root")).render(   
<BrowserRouter> 
  <CssBaseline/>
  <App />   
</BrowserRouter>
);