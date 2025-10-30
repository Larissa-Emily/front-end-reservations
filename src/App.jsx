import React from "react";
import RoutesApp from "./routes/index.jsx";
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <RoutesApp />
    </BrowserRouter>
  );
}
