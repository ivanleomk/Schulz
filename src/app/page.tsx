import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useSupabase } from "./supabase-provider";
import LoginComponent from "../../components/LoginComponent";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import SignOutButton from "../../components/SignOutButton";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const userAuthStatus = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Next.js + Supabase</h1>

        <br />
        <Suspense fallback={<p>Loading...</p>}>
          {userAuthStatus.data.user ? (
            <>
              <Link href="/dashboard">Access Protected Route</Link>
              <SignOutButton />
            </>
          ) : (
            <LoginComponent />
          )}
        </Suspense>
      </div>
    </main>
  );
}

function undefined({}) {
  return (
    <>
      <Label htmlFor="email-2">Email</Label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    </>
  );
}
