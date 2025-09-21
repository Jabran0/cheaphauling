"use client";
import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and inject the Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/68c6a87be72aad1923ddfd9c/1j54048vp';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Insert the script
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const tawkScript = document.querySelector('script[src*="embed.tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
      // Clean up the chat widget
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function() {
          window.Tawk_API.hideWidget();
        };
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
