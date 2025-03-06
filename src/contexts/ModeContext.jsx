import { createContext, useState, useContext } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({children}) => {

    const [mode, setMode] = useState('light');
    const toggleMode = () =>{
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
    }
  return (
    <ModeContext.Provider value={{mode, toggleMode}}>
      {children}
    </ModeContext.Provider>
  );
};

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}