import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/layout";
import Calendar from "../pages/Calendar";
import Profile from "../pages/Profile";
import Reserve from "../pages/Reserve";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Páginas sem menu */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Páginas com menu */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
