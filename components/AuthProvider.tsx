"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase-browser";
import { Session, User } from "@supabase/gotrue-js/src/lib/types";
import { AuthError } from "@supabase/gotrue-js/dist/module/lib/errors";

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
};

export const SIGN_IN = "sign_in";
export const SIGN_UP = "sign_up";
export const FORGOTTEN_PASSWORD = "forgotten_password";
export const MAGIC_LINK = "magic_link";
export const UPDATE_PASSWORD = "update_password";

export type View =
  | typeof SIGN_IN
  | typeof SIGN_UP
  | typeof FORGOTTEN_PASSWORD
  | typeof MAGIC_LINK
  | typeof UPDATE_PASSWORD;

function authErrorNoop(): Promise<{ error: null | AuthError }> {
  // Do some work...
  if (false) {
    return Promise.reject(new AuthError("Authentication failed", 401));
  }
  // Do some more work...
  return Promise.resolve({
    error: null,
  });
}

type AuthContext = {
  initial: boolean;
  session: Session | null;
  user: User | null;
  view: View;
  setView: (view: View) => void;
  signOut: () => Promise<{ error: AuthError | null }>;
};

const initialAuthContext = {
  initial: true,
  session: null,
  user: null,
  view: SIGN_IN as View,
  setView: () => {},
  signOut: authErrorNoop,
};

export const AuthContext = createContext<AuthContext>(initialAuthContext);

type ContextProps = {
  accessToken: string;
  children: React.ReactNode;
};

export const AuthProvider = (props: ContextProps) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>(VIEWS.SIGN_IN as View);
  const router = useRouter();
  const { accessToken, ...rest } = props;

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(UPDATE_PASSWORD);
          break;
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(SIGN_IN);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      signOut: () => supabase.auth.signOut(),
    };
  }, [initial, session, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
