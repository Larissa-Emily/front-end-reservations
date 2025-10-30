import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute/protectedRoute"
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/layout";
import Profile from "../pages/Profile";
import Reserve from "../pages/Reserve";
import User from "../pages/User";
import Room from "../pages/Room";

export default function RoutesApp() {
  return (
      <Routes>
        {/* Páginas sem menu */}
        <Route path="/" element={<Login />} />
        {/* Páginas com menu */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reserve"
            element={
              <ProtectedRoute>
                <Reserve />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRole="manager">
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room"
            element={
              <ProtectedRoute requiredRole="manager">
                <Room />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
  );
}
