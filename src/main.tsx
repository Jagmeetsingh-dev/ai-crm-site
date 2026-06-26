import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { loadWebezioAnalytics } from "@/lib/webezio";

// Send page views into the Webezio Labs Analytics tab (no-ops without a key).
loadWebezioAnalytics();

// Code-split routes so each page ships its own chunk.
const LandingPage = lazy(() => import("./landing/LandingPage"));
const SignUpPage = lazy(() => import("./signup/SignUpPage"));
const LoginPage = lazy(() => import("./login/LoginPage"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
