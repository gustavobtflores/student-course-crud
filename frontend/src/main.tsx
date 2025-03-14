import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/login";
import "./index.css";
import { Signup } from "./pages/signup";
import { Alert } from "./components/alert";
import { AlertProvider } from "./contexts/AlertContext";
import { Students } from "./pages/students";
import { RouteChangeHandler } from "./helpers/routeChangeHandler";
import { Courses } from "./pages/courses";
import { Enrollments } from "./pages/enrollments";
import Layout from "./components/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <RouteChangeHandler />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<Courses />} />
            <Route path="enrollments" element={<Enrollments />} />
          </Route>
        </Routes>
        <Alert />
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>
);
