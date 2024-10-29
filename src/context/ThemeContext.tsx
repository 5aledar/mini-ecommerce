import { createContext, useContext, useState, ReactNode } from "react";


interface ThemeContextType {
    themeContext: string; 
    setThemeContext: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");
    }
    return context;
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [themeContext, setThemeContext] = useState<string>('light'); 
    return (
        <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
            {children}
        </ThemeContext.Provider>
    );
};
