"use client";
import { useSupabase } from "@/app/supabase-provider";
import React from "react";

const SignOutButton = () => {
  const { supabase } = useSupabase();
  const handleLogout = () => [supabase.auth.signOut()];
  return (
    <div
      onClick={() => {
        handleLogout();
      }}
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
