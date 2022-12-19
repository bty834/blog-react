import React, {createContext, useEffect, useRef, useState} from 'react';
import {Navbar} from "./index";
import {ThemeContext} from "./context/ThemeContext";

export const localStoredModeKey = "btyBlogMode"

const Layout = ({children}) => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (window.localStorage.getItem(localStoredModeKey)) {
            setTheme(window.localStorage.getItem(localStoredModeKey))
        } else if (window.sessionStorage.getItem(localStoredModeKey)) {
            window.localStorage.removeItem(localStoredModeKey)
            setTheme(window.sessionStorage.getItem(localStoredModeKey))
        } else {
            window.localStorage.removeItem(localStoredModeKey)
            window.sessionStorage.removeItem(localStoredModeKey)
            setTheme("light")
        }
    }, []);


    const toggleTheme = () => {
        setTheme((curTheme) => {
            let newTheme = curTheme === "dark" ? "light" : "dark"
            if (window !== undefined) {
                window.localStorage.setItem(localStoredModeKey, newTheme)
                window.sessionStorage.setItem(localStoredModeKey, newTheme)
            }
            return newTheme
        })
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div id={theme} className="w-full h-full m-0 p-0">
                <Navbar/>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export default Layout;
