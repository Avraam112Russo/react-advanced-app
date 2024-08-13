import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "app/providers/themeProvider/lib/ThemeContext";



// we get Theme from local storage and cast type Theme to string type, if local storage is empty, so we set Theme.LIGHT
const defaultTheme: Theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT
const ThemeProvider:FC = ({children}) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)

    // useMemo store already exist object,
    // and if dependencies array ([theme]) has not been changed, we retrieve this object from useMemo
    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])
    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;