export default function Post({ post }) {
  return (
    <div className="post" style={{ padding: "8px", margin: "6px 0", border: "1px solid #eee", borderRadius: "8px" }}>
      <div style={{ fontSize: "12px", color: "#666" }}>{new Date(post.created_at).toLocaleString()}</div>
      <div style={{ marginTop: "4px" }}>{post.content}</div>
      {post.media_url && <img src={post.media_url} alt="" style={{ maxWidth: "100%", marginTop: "6px", borderRadius: "6px" }} />}
    </div>
  );
      }
