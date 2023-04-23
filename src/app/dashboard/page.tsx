import React from "react";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { headers, cookies } from "next/headers";
import { DB } from "@/types/database";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  return <div>Protected Route</div>;
};

export default Dashboard;
