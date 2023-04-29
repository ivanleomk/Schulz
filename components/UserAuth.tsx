"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const UserAuth = () => {
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
