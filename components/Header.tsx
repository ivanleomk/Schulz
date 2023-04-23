"use client";
import React from "react";
import { UserButton, useClerk } from "@clerk/nextjs";

const Header = () => {
  const clerk = useClerk();
  return (
    <div>
      <UserButton afterSignOutUrl="/sign-out" />
    </div>
  );
};

export default Header;
