"use client";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { UserButton, useClerk } from "@clerk/nextjs";

const UserAvatar = () => {
  const { user } = useClerk();

  return (
    <Avatar>
      <UserButton afterSignOutUrl={"schulz.ivanleo.com"} />
    </Avatar>
  );
};

export default UserAvatar;
