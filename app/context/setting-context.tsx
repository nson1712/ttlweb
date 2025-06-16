// contexts/SettingsContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export type Theme = "light" | "dark" | "sepia"

interface Settings {
  fontSize: number;
  paragraphSpacing: number;
  setFontSize: (v: number) => void;
  setParagraphSpacing: (v: number) => void;
  theme?: Theme;
  setTheme?: (v: Theme) => void; // Nếu cần quản lý theme
}

export const SettingsContext = createContext<Settings>({
  fontSize: 18,
  paragraphSpacing: 12,
  setFontSize: () => {},
  setParagraphSpacing: () => {},
  theme: "dark",
  setTheme: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, _setFontSize] = useState(18);
  const [paragraphSpacing, _setParagraphSpacing] = useState(12);
  const [theme, _setTheme] = useState<Theme>("dark");

  // Load từ localStorage
  useEffect(() => {
    const fs = localStorage.getItem("chs_fontSize");
    const ps = localStorage.getItem("chs_paragraphSpacing");
    const theme = localStorage.getItem("th_theme");
    if (fs) _setFontSize(Number(fs));
    if (ps) _setParagraphSpacing(Number(ps));
    if (theme) _setTheme(theme as Theme);
  }, []);

  // Save khi thay đổi
  useEffect(() => {
    localStorage.setItem("chs_fontSize", fontSize.toString());
    localStorage.setItem("chs_paragraphSpacing", paragraphSpacing.toString());
    localStorage.setItem("th_theme", theme.toString());
  }, [fontSize, paragraphSpacing, theme]);

  // useEffect(() => {
  //   localStorage.setItem("chs_paragraphSpacing", paragraphSpacing.toString());
  // }, [paragraphSpacing]);

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        paragraphSpacing,
        setFontSize: _setFontSize,
        setParagraphSpacing: _setParagraphSpacing,
        theme,
        setTheme: _setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
