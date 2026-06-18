import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView, trackCustomEvent } from '../lib/analytics';

/**
 * AnalyticsTracker listens to React Router navigation changes to fire page view events,
 * and handles global CTA interactions automatically.
 */
export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Google Analytics 4 (only in production)
    initGA();

    // 2. Register global click tracking as an automated safety net for CTA actions
    const handleGlobalClick = (event: MouseEvent) => {
      let target = event.target as HTMLElement | null;
      
      // Traverse up slightly to catch button parents/svg wrappers
      while (target && target !== document.body) {
        const text = (target.textContent || target.innerText || '').trim().toLowerCase();
        
        if (
          text.includes('book consultation') || 
          text.includes('book strategy call') || 
          text.includes('book a strategy call')
        ) {
          trackCustomEvent('Book Consultation button clicks', {
            location: window.location.pathname,
            buttonText: text
          });
          break;
        }

        if (text.includes('confirm booking')) {
          trackCustomEvent('Confirm Booking button clicks', {
            location: window.location.pathname
          });
          break;
        }

        target = target.parentElement;
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    // Track every page view when the router location changes (Requirement 2)
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
