/**
 * Global error handling for Google Maps and other third-party scripts
 */

export const setupErrorHandling = () => {
  if (typeof window !== 'undefined') {
    // Suppress Google Maps errors
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      // Filter out Google Maps errors
      const errorString = args.join(' ');
      if (
        errorString.includes('Google Maps JavaScript API') ||
        errorString.includes('browser is not defined') ||
        errorString.includes('maps.googleapis.com') ||
        errorString.includes('Google Maps API')
      ) {
        // Suppress the error
        return;
      }
      
      // Pass through other errors
      originalConsoleError.apply(console, args);
    };

    // Handle window errors
    window.addEventListener('error', (event) => {
      if (
        event.message.includes('browser is not defined') ||
        event.message.includes('Google Maps') ||
        (event.filename && event.filename.includes('maps.googleapis.com'))
      ) {
        // Prevent the error from being reported to the console
        event.preventDefault();
        return true;
      }
      return false;
    }, true);
  }
};

export default setupErrorHandling;