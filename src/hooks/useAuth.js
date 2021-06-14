import { useState, useEffect } from 'react';
import { supabase } from 'libs/clients/supabase';

export const useAuth = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const logout = () => supabase.auth.signOut();
  return { session, logout };
};
