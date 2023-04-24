"use client";
import React, { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  useAuth,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const UserAuth = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return (
      <Link href="/dashboard">
        <Button variant="ghost">Go To Dashboard</Button>
      </Link>
    );
  }

  return (
    <SignInButton mode="modal">
      <Button
        variant="ghost"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Sign In
      </Button>
    </SignInButton>
  );
};

export default UserAuth;
