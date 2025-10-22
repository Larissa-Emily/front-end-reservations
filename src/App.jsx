import React from "react";
import RoutesApp from "./routes/index.jsx";
import { BrowserRouter} from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}
