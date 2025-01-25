import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AdminProvider } from './contexts/AdminContext';
import App from './App';
import LoginPage from './pages/admin/LoginPage';
import ConfigPage from './pages/admin/ConfigPage';
import ButtonsPage from './pages/admin/buttons';
import CitiesPage from './pages/admin/CitiesPage';
import LogsPage from './pages/admin/LogsPage';
import MedianeiraPage from './pages/medianeira';
import MissalPage from './pages/missal';
import CascavelPage from './pages/cascavel';
import SaoMiguelDoIguacuPage from './pages/saomigueldoiguacu';
import TermsOfUsePage from './pages/TermsOfUse';
import PrivacyPage from './pages/Privacy';
import CookiesPage from './pages/Cookies';
import ScriptLoader from './components/ScriptLoader';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AdminProvider>
        <ErrorBoundary>
          <Router>
            <ScriptLoader />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <ConfigPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/buttons" element={
                <ProtectedRoute>
                  <ButtonsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/cities" element={
                <ProtectedRoute>
                  <CitiesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/logs" element={
                <ProtectedRoute>
                  <LogsPage />
                </ProtectedRoute>
              } />
              <Route path="/em-medianeira" element={<MedianeiraPage />} />
              <Route path="/em-missal" element={<MissalPage />} />
              <Route path="/em-cascavel" element={<CascavelPage />} />
              <Route path="/em-sao-miguel-do-iguacu" element={<SaoMiguelDoIguacuPage />} />
              <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              {/* Redireciona qualquer rota administrativa não encontrada para /admin */}
              <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </AdminProvider>
    </HelmetProvider>
  </StrictMode>
);