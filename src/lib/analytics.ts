/**
 * Google Analytics 4 Integration for Leopard Luxe
 * Measurement ID: G-L211FBE6RT
 */

export const MEASUREMENT_ID = 'G-L211FBE6RT';

// Load analytics only in production mode
export const isProd = import.meta.env.PROD;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Dynamically injects and initializes the official Google Analytics 4 gtag scripts
 */
export function initGA() {
  if (!isProd) {
    console.log("Google Analytics skipped in development mode.");
    return;
  }

  // Prevent multiple script insertions
  if (document.getElementById('ga-script')) {
    return;
  }

  try {
    // 1. Create the global tracking script tag
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Define window.gtag and window.dataLayer variables
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // 3. Configure the tracker
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: false // Manual tracking helps us capture single-page application routing accurately!
    });

    // 4. Verify initialization with console confirmation
    console.log("Google Analytics Connected");
  } catch (error) {
    console.error("Failed to initialize Google Analytics:", error);
  }
}

/**
 * Tracks SPA Route Changes / Page Views
 * @param pagePath Page URL path, e.g. '/discovery' or '/portal'
 */
export function trackPageView(pagePath: string) {
  if (!isProd) {
    console.log(`[Dev Analytics] Tracked Page View: ${pagePath}`);
    return;
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      send_to: MEASUREMENT_ID
    });
  }
}

/**
 * Tracks specified custom events in Google Analytics
 * @param eventName Name of the action event
 * @param params Optional key-value parameters for the event
 */
export function trackCustomEvent(eventName: string, params?: Record<string, any>) {
  if (!isProd) {
    console.log(`[Dev Analytics] Tracked Custom Event: "${eventName}"`, params);
    return;
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
