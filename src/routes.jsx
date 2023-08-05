import React from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

// pages

import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
