import { createContext, useState } from "react";

const ActiveKeysContext = createContext();

export function ActiveKeysContext({ children }) {
  return (
    <ActiveKeysContext.Provider value={activeKeys}>
      {children}
    </ActiveKeysContext.Provider>
  );
}

export default ActiveKeysContext;
