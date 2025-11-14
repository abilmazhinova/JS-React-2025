export default function ErrorBox({ message }) {
  return (
    <div style={{ color: "red", background: "#ffe6e6", padding: "10px", borderRadius: "6px" }}>
      <strong>Error:</strong> {message}
    </div>
  );
}
