"use client";
import React, { useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const UserAuth = () => {
  return (
    <SignInButton mode="modal">
      <Button>Sign In</Button>
    </SignInButton>
  );
};

export default UserAuth;
