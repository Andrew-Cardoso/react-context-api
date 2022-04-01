import React from "react";

export type Theme = 'dark' | 'darker';

export const ThemeContext = React.createContext<Theme>('dark')