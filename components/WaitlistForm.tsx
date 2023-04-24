"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<string | undefined>(undefined);

  const { toast, dismiss } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !name || !goal) {
      toast({
        title: "Invalid Input",
        description: "Please provide a valid input for the values",
      });
      setTimeout(() => {
        dismiss();
      }, 3000);
      return;
    }
    fetch("/api/waitlist/add-user", {
      method: "POST",
      body: JSON.stringify({ email, name, goal }),
    }).then(async (res) => {
      const body = await res.json();
      const { status, message } = body;
      console.log(status, typeof status);
      if (status !== 200) {
        toast({
          title: "Error Encountered",
          description: message,
        });
      } else {
        toast({
          title: "Success",
          description: `Succesfully added ${email} to the waitlist`,
        });
      }
      setTimeout(() => {
        dismiss();
      }, 3000);
    });
  };

  return (
    <form className="mt-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="mt-6 cursor-pointer">
        <Label htmlFor="email">Email</Label>
        <div className="my-2" />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div className="mt-6">
        <Label htmlFor="name">Name</Label>
        <div className="my-2" />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="Your Name"
        />
      </div>
      <div className="mt-6">
        <Label htmlFor="name">What will you be using this for?</Label>
        <div className="my-2" />
        <Select value={goal} onValueChange={(e) => setGoal(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Outreach">Outreach</SelectItem>
              <SelectItem value="Interviews">Interviews</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <hr className="w-40 h-2 border-t-1 mx-auto my-6 border-black" />
      <div className="">
        <Button variant="default" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default WaitlistForm;
