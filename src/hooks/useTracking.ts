import { useCallback } from 'react';

interface TrackingData {
  [key: string]: any;
}

export function useTracking() {
  const trackEvent = useCallback((eventName: string, data: TrackingData = {}) => {
    if (window.trackConversion) {
      window.trackConversion(eventName, {
        ...data,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return { trackEvent };
}