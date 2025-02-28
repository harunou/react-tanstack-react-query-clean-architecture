import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./features/app/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}

const queryClient = new QueryClient();

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
