import { useState, useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

function getSize() {
  if (!isBrowser) {
    return { width: 1280, height: 800 }; // Default size for server-side rendering
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isBrowser) {
      return; // Don't run this effect on the server
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}