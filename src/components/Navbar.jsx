import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Navbar({ profile }) {
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <nav style={{ padding: "12px", background: "#07689f", color: "white", display: "flex", alignItems: "center", gap: "12px" }}>
      <Link to="/feed" style={{ color: "white" }}>Feed</Link>
      <Link to={`/profile/${profile?.id}`} style={{ color: "white" }}>Meu Perfil</Link>
      <Link to="/chat/0" style={{ color: "white" }}>Mensagens</Link>
      <div style={{ marginLeft: "auto" }}>
        {profile && (
          <>
            <span>{profile.display_name}</span>
            <button onClick={logout} style={{ marginLeft: "12px", background: "#e74c3c", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px" }}>
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
