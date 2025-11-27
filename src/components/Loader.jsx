export default function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "24px" }}>
      <div className="spinner" style={{
        width: "36px",
        height: "36px",
        border: "4px solid #ccc",
        borderTop: "4px solid #2a9d8f",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto"
      }} />
      <style>{`
        @keyframes spin { 
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
