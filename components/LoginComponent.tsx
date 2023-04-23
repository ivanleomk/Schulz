"use client";
import React, { Suspense, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSupabase } from "@/app/supabase-provider";
import Link from "next/link";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [password, setPassword] = useState("");
  const { supabase } = useSupabase();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={(e) => handleSignIn(e)}>
      <div className="my-2">
        <Label htmlFor="email">Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
        />
        <p className="text-sm text-muted-foreground">
          Enter your email address.
        </p>
      </div>

      <div className="my-4">
        <Label htmlFor="email-2">Password</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="email-2"
          placeholder="Password"
          autoComplete="password"
        />
        <p className="text-sm text-muted-foreground">
          Password should be secreto
        </p>
      </div>
      <Button className="my-4">Sign In</Button>
    </form>
  );
};

export default LoginComponent;
