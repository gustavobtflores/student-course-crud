import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/login";
import "./index.css";
import { Signup } from "./pages/signup";
import { Alert } from "./components/alert";
import { AlertProvider } from "./contexts/AlertContext";
import { Student } from "./pages/student";
import { RouteChangeHandler } from "./helpers/routeChangeHandler";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <RouteChangeHandler />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<Student />} />
        </Routes>
        <Alert />
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>
);
