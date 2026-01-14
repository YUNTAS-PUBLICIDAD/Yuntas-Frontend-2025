'use client';

import { useEffect, useState } from 'react';
import Switch from "react-switch";
import { FiMoon, FiSun } from "react-icons/fi";

interface SwitchModeProps {
  onToggle?: (isDarkMode: boolean) => void;
}

export default function SwitchMode({ onToggle }: SwitchModeProps) {
  const [checked, setChecked] = useState(false);

  // 🔹 Leer tema guardado
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setChecked(true);
    }
  }, []);

  // 🔹 Cambiar tema
  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);

    document.documentElement.classList.toggle("dark", nextChecked);
    localStorage.setItem("theme", nextChecked ? "dark" : "light");

    onToggle?.(nextChecked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      handleDiameter={24}
      offColor="#ffffff"        // ☀️ modo claro
      onColor="#0D1030"         // 🌙 modo oscuro (NUEVO)
      offHandleColor="#203565"
      onHandleColor="#ffffff"
      height={32}
      width={70}
      borderRadius={100}
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "100%",
            fontSize: 24,
            color: "#203565",
            paddingRight: 8
          }}
        >
          <FiMoon />
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
            fontSize: 24,
            color: "white",
            paddingLeft: 8
          }}
        >
          <FiSun />
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
}
