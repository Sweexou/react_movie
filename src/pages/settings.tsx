import { useTheme } from "../context/ThemeContext";

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Settings ⚙️</h1>

      <button 
        onClick={toggleTheme}
        style={{
          padding: "0.6rem 1rem",
          marginTop: "1rem"
        }}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} mode
      </button>
    </div>
  );
}
