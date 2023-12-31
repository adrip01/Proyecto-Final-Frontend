import React from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

// pages

import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";
import MyCardsTasksPage from "./pages/MyCardsTasksPage";
import NewCardPage from "./pages/NewCardPage";
import NewTaskPage from "./pages/NewTaskPage";
import EditCardPage from "./pages/EditCardPage";
import EditTaskPage from "./pages/EditTaskPage";
import AboutUsPage from "./pages/AboutUsPage";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/profile" element={<ProfilePage />} />
        <Route path="/users/account" element={<AccountPage />} />
        <Route path="/users/my-cards-tasks" element={<MyCardsTasksPage />} />
        <Route path="/users/new-card" element={<NewCardPage />} />
        <Route path="/users/new-task/:id" element={<NewTaskPage />} />
        <Route path="/users/edit-card/:id" element={<EditCardPage />} />
        <Route path="/users/edit-task/:id" element={<EditTaskPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
