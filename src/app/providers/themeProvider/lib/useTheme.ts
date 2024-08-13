import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "app/providers/themeProvider/lib/ThemeContext";
import {useContext} from "react";


export interface ThemeResult{
    toggleTheme: () => void,
    theme: Theme
}
export function useTheme(): ThemeResult {
    const {theme, setTheme} = useContext(ThemeContext); // retrieve theme value from context
    const toggleTheme = (): void => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        setTheme(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme); // save selected theme in local storage
    }
    return {toggleTheme, theme};
}