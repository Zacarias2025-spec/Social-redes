import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import Message from "../components/Message";
import Loader from "../components/Loader";

export default function Chat() {
  const { id } = useParams(); // conversa com usuário id
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    setLoading(true);
    const { data } = await supabase.from("messages")
      .select("*")
      .or(`sender_id.eq.${id},receiver_id.eq.${id}`)
      .order("created_at", { ascending: true });
    setMessages(data || []);
    setLoading(false);
  }

  async function sendMessage() {
    if (!text) return;
    await supabase.from("messages").insert({ receiver_id: id, text });
    setText("");
  }

  useEffect(() => {
    loadMessages();
    const channel = supabase.channel("realtime-messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => loadMessages())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "12px" }}>
      <h2>Chat</h2>
      <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "12px" }}>
        {messages.map(m => <Message key={m.id} message={m} currentUserId={supabase.auth.getUser()?.data?.user?.id} />)}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Digite sua mensagem" rows={3} style={{ width: "100%", padding: "6px", borderRadius: "6px" }} />
      <button onClick={sendMessage} style={{ marginTop: "6px" }}>Enviar</button>
    </div>
  );
}
