import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeGame, setActiveGame] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <AppContext.Provider
      value={{
        loading,
        finishLoading,
        scrollProgress,
        setScrollProgress,
        activeGame,
        setActiveGame,
        mouse,
        setMouse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
