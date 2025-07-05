"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function GlobalThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    backgroundColor: theme === "light" ? "#007bff" : "#333",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <button onClick={handleToggle} style={buttonStyle}>
      {theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}
