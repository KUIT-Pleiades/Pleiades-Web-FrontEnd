//main.tsx
import { Buffer } from 'buffer';
window.Buffer = Buffer;

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { HelmetProvider } from 'react-helmet-async';

// 1. React Query 관련 import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. QueryClient 인스턴스 생성
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 3. QueryClientProvider로 App 전체를 감싸줌 */}
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);