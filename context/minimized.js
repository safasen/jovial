"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext({
  minimized: false,
  setMinimized: () => {},
});

export const SidebarProvider = ({ children }) => {
  const [minimized, setMinimized] = useState(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sidebarMinimized');
    return stored === 'true';
  }
  return false;
  });

  useEffect(() => {
    const stored = localStorage.getItem('sidebarMinimized');
    if (stored !== null) {
      setMinimized(stored === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarMinimized', minimized.toString());
  }, [minimized]);

  return (
    <SidebarContext.Provider value={{ minimized, setMinimized }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);