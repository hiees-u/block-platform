import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/block-platform/">
    <App />
  </BrowserRouter>
);
