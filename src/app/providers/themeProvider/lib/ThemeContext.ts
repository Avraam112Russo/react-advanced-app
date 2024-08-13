import {createContext} from "react";

export enum Theme{
    LIGHT = 'light',
    DARK = 'dark'
}
export interface ThemeContextProps {
    theme?: Theme,
    setTheme?: (theme: Theme) => void;
}

// able to get theme in all app
export const ThemeContext = createContext<ThemeContextProps>({})


export const LOCAL_STORAGE_THEME_KEY = 'theme'; // key in local storage for saving selected theme