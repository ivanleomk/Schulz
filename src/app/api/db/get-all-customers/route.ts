import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const customers = db
    .selectFrom("Customer")
    .selectAll()
    .where("Customer.user_id", "=", user.id)
    .execute();

  const companies = db
    .selectFrom("Company")
    .selectAll()
    .where("Company.user_id", "=", user.id)
    .execute();
  await Promise.all([customers, companies]);
  return NextResponse.json({
    customers,
    companies,
  });
}
