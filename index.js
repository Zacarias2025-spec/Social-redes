// index.js (Next.js com React integrado)

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmiqbxhoahzhfavcuujw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaXFieGhvYWh6aGZhdmN1dWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzM1OTEsImV4cCI6MjA3OTc0OTU5MX0.ivtBb7DOFMw7tek_zeXZPmiAk9GdutK03iaPcBfl7nI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    supabase
      .from('posts')
      .on('*', payload => {
        fetchPosts();
      })
      .subscribe();

    fetchPosts();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data);
  };

  const signIn = async () => {
    // Implementar login com Magic Link ou OAuth aqui
  };

  const signOut = () => {
    supabase.auth.signOut();
    setSession(null);
  };

  // Funções de cadastro, login, edição de perfil, postagem, mensagens, notificações, etc.,
  // devem ser implementadas aqui ou em componentes separados

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {!session ? (
        <button onClick={signIn}>Entrar / Cadastrar</button>
      ) : (
        <>
          <button onClick={signOut}>Sair</button>
          {profile ? (
            <div>
              <img src={profile.avatar_url} width={50} height={50} alt="Foto" />
              <h2>{profile.display_name} <small>@{profile.username}</small></h2>
              <p>{profile.bio}</p>
              <button>Edit Profile</button>
              <h3>Publicações</h3>
              {posts.map(post => (
                <div key={post.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                  <p>{post.content}</p>
                  {post.media_url && <img src={post.media_url} width="200" />}
                  {post.video_url && (
                    <iframe width="300" height="200" src={post.video_url} frameBorder="0" allowFullScreen></iframe>
                  )}
                  <div>
                    <button>Curtir</button>
                    <button>Comentar</button>
                    <button>Compartilhar</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Carregando perfil...</p>
          )}
        </>
      )}
    </div>
  );
}
