import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Code-split routes so each page ships its own chunk.
const LandingPage = lazy(() => import("./landing/LandingPage"));
const SignUpPage = lazy(() => import("./signup/SignUpPage"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
