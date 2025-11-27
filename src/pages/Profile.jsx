import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Loader from "../components/Loader";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
    setProfile(data);
    const { data: userPosts } = await supabase.from("posts").select("*").eq("user_id", id).order("created_at", { ascending: false });
    setPosts(userPosts || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "12px" }}>
      <h2>{profile.display_name} (@{profile.username})</h2>
      <p>{profile.bio}</p>
      <h3>Publicações</h3>
      {posts.map(p => <Post key={p.id} post={p} />)}
    </div>
  );
}
