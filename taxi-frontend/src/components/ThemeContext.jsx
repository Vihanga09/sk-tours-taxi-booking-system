import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initial theme state based on localStorage
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        // Apply theme to body
        if (isDarkMode) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#ffffff';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.style.backgroundColor = '#f4f7f6';
            document.body.style.color = '#000000';
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};