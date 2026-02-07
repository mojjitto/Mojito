export function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f172a",
      color: "#e5e7eb",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Mojito está vivo 🍸
        </h1>
        <p style={{ opacity: 0.8 }}>
          React + Vite + GitHub Pages funcionando
        </p>
      </div>
    </div>
  );
}