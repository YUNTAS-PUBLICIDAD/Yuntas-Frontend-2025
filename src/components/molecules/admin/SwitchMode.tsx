'use client';

import { useEffect, useState } from 'react';
import Switch from "react-switch";
import { FiMoon, FiSun } from "react-icons/fi";

interface SwitchModeProps {
  onToggle?: (isDarkMode: boolean) => void;

  /** Colores del fondo */
  lightBgColor?: string;
  darkBgColor?: string;

  /** Colores de la bolita */
  lightHandleColor?: string;
  darkHandleColor?: string;

  /** Mostrar iconos */
  showIcons?: boolean;
}

export default function SwitchMode({
  onToggle,
  lightBgColor = "#ffffff",   // sidebar claro
  darkBgColor = "#0D1030",    // sidebar oscuro
  lightHandleColor = "#0D1030",
  darkHandleColor = "#ffffff",
  showIcons = true,
}: SwitchModeProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const syncThemeState = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark";

      document.documentElement.classList.toggle("dark", isDark);
      setChecked(isDark);
    };

    syncThemeState();

    window.addEventListener("storage", syncThemeState);
    window.addEventListener("themechange", syncThemeState as EventListener);

    return () => {
      window.removeEventListener("storage", syncThemeState);
      window.removeEventListener("themechange", syncThemeState as EventListener);
    };
  }, []);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    document.documentElement.classList.toggle("dark", nextChecked);
    localStorage.setItem("theme", nextChecked ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
    onToggle?.(nextChecked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      aria-label="Alternar modo oscuro"
      handleDiameter={24}
      height={32}
      width={70}
      borderRadius={100}

      offColor={lightBgColor}
      onColor={darkBgColor}

      offHandleColor={lightHandleColor}
      onHandleColor={darkHandleColor}

      uncheckedIcon={
        showIcons ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
              fontSize: 22,
              color: "#203565",
              paddingRight: 8,
            }}
          >
            <FiMoon />
          </div>
        ) : false
      }
      checkedIcon={
        showIcons ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              fontSize: 22,
              color: "white",
              paddingLeft: 8,
            }}
          >
            <FiSun />
          </div>
        ) : false
      }
    />
  );
}
