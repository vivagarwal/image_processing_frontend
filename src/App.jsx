import React from "react";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import './index.css';
import HelloPage from "./pages/HelloPage";
import FileUploadPage from "./pages/FileUploadPage";
import StatusPage from "./pages/StatusPage";

const App = () => {
  return (
      <div className="container mt-4">
        <Routes>
        <Route path="/" element={<HelloPage />} />
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/status" element={<StatusPage />} />
        </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
