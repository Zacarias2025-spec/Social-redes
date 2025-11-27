import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  async function loadPosts() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  }

  async function createPost() {
    if (!text) return;

    await supabase.from("posts").insert({ content: text });
    setText("");
  }

  useEffect(() => {
    loadPosts();

    const channel = supabase.channel("realtime-posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, payload => {
        loadPosts();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="feed">
      <h2>Esfera Conectada - Feed</h2>

      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="O que está acontecendo?" />

      <button onClick={createPost}>Publicar</button>

      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post">{post.content}</div>
        ))}
      </div>
    </div>
  );
                                                    }
