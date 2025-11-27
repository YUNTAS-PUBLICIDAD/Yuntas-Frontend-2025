'use client';

import { useState } from 'react'
import Switch from "react-switch";
import { FiMoon, FiSun } from "react-icons/fi";

export default function SwitchMode() {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      handleDiameter={24}
      offColor="#fff"
      onColor="#203565"
      offHandleColor="#203565"
      onHandleColor="#fff"
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
  )
}