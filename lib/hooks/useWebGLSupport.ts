import { useState, useEffect } from 'react';

export function useWebGLSupport(): boolean {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(!!gl);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}

