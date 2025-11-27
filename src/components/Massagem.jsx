export default function Message({ message, currentUserId }) {
  const isMine = message.sender_id === currentUserId;

  return (
    <div style={{
      display: "flex",
      justifyContent: isMine ? "flex-end" : "flex-start",
      margin: "4px 0"
    }}>
      <div style={{
        background: isMine ? "#2a9d8f" : "#eee",
        color: isMine ? "#fff" : "#000",
        padding: "6px 10px",
        borderRadius: "8px",
        maxWidth: "70%"
      }}>
        {message.text}
        {message.file_url && <div><a href={message.file_url} target="_blank" rel="noreferrer">Arquivo</a></div>}
        <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>{new Date(message.created_at).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
