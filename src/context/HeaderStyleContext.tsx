"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface HeaderStyleContextValue {
  forceSolid: boolean;
  setForceSolid: (value: boolean) => void;
}

const HeaderStyleContext = createContext<HeaderStyleContextValue | null>(null);

export function HeaderStyleProvider({
  children,
  initialForceSolid = false,
}: {
  children: React.ReactNode;
  initialForceSolid?: boolean;
}) {
  const [forceSolid, setForceSolid] = useState(initialForceSolid);

  useEffect(() => {
    setForceSolid(initialForceSolid);
  }, [initialForceSolid]);

  const value = useMemo(() => ({ forceSolid, setForceSolid }), [forceSolid]);

  return (
    <HeaderStyleContext.Provider value={value}>
      {children}
    </HeaderStyleContext.Provider>
  );
}

export function useHeaderStyle() {
  const ctx = useContext(HeaderStyleContext);
  if (!ctx) {
    return { forceSolid: false, setForceSolid: () => {} };
  }
  return ctx;
}

// Permite que una página sin hero (ej. 404) pida un header sólido desde el montaje.
export function useForceSolidHeader() {
  const { setForceSolid } = useHeaderStyle();

  useEffect(() => {
    setForceSolid(true);
    return () => setForceSolid(false);
  }, [setForceSolid]);
}
