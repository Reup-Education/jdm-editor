import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useHotkeys } from 'react-hotkeys-hook'

type DevModeContext = {
  devMode: boolean;
}

const DevModeContext = createContext<DevModeContext>({
  devMode: false
});

export const DevModeProvider = ({ children }: PropsWithChildren) => {
  const [devMode, setDevMode] = useState<boolean>(false);
  useHotkeys('shift+d', () => setDevMode(prev => !prev));
  console.log('dev mode:', devMode);

  return <DevModeContext.Provider value={{devMode}}>{ children }</DevModeContext.Provider>;
}

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error('useDevMode must be called with in a DevModeProvider');
  }

  return context;
}