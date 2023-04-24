import React from "react";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import UserAvatar from "../../../components/UserAvatar";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import DashboardTabComponent from "../../../components/DashboardTabComponent";

export const metadata = {
  title: "Dashboard",
  description: "This is where the magic happens",
};

const tabs = [
  {
    label: "Overview",
    value: "Overview",
  },
  {
    label: "Meeting Notes",
    value: "Meeting Notes",
  },
  {
    label: "Collaterals",
    value: "Collateral",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 border-b-2">
        <h2 className="text-lg font-semibold">Schulz.AI</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <UserAvatar />
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <DashboardTabComponent values={tabs} />
      </div>
    </>
  );
};

export default Dashboard;
