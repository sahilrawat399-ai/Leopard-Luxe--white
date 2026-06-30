/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { Header } from './components/Header';
import { BookingFormModal } from './components/BookingFormModal';
import { Preloader } from './components/Preloader';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { ServicesPage } from './pages/ServicesPage';
import { ResultsPage } from './pages/ResultsPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { AuthProvider } from './components/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { Dashboard } from './pages/Dashboard';
import { ClientPortal } from './pages/ClientPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { BookingTrackerPage } from './pages/BookingTrackerPage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { ScrollToTop } from './components/ScrollToTop';
import { AnalyticsTracker } from './components/AnalyticsTracker';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AnalyticsTracker />
        <ScrollToTop />
        {!preloaderFinished && <Preloader onComplete={() => setPreloaderFinished(true)} />}
        
        {preloaderFinished && (
          <>
            <Header />
            <BookingFormModal />
          </>
        )}
        
        <div className={`transition-opacity duration-1000 ${preloaderFinished ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/bookings" element={<BookingTrackerPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/portal" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          </Routes>
          <Footer />
          <FloatingButtons />
        </div>
      </Router>
    </AuthProvider>
  );
}
