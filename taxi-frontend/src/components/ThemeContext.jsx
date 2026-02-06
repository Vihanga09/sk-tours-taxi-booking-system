import React, { createContext, useState, useEffect } from 'react';

/**
 * ThemeContext provides global access to the current theme state 
 * and a function to toggle between Light and Dark modes.
 */
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage to persist user preference after refresh
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    // Function to toggle the boolean state of the theme
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        const themeValue = isDarkMode ? 'dark' : 'light';
        
        // ✅ Apply the 'data-theme' attribute to the body for CSS selectors to work
        document.body.setAttribute('data-theme', themeValue);
        
        // Update local storage to remember choice
        localStorage.setItem('theme', themeValue);

        // Apply global background and text colors to the body
        if (isDarkMode) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#ffffff';
        } else {
            document.body.style.backgroundColor = '#f4f7f6';
            document.body.style.color = '#000000';
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};