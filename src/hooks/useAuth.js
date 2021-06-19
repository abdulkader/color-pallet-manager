import { useState, useEffect } from 'react';
import { supabase } from 'libs/clients/supabase';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setLoading(false);
  }, []);
  const logout = () => supabase.auth.signOut();
  const isLoggedIn = session?.user?.id || false;
  return { session, logout, isLoggedIn, loading };
};
