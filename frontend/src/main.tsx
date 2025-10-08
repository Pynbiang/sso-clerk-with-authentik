import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as
  | string
  | undefined;

if (!clerkPublishableKey) {
  // Fail fast during development if env is missing
  // eslint-disable-next-line no-console
  console.warn(
    "Missing VITE_CLERK_PUBLISHABLE_KEY. Please set it in your .env file."
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey || ""}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
