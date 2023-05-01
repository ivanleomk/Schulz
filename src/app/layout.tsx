import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Toaster } from "../../components/ui/toaster";
import { SummaryInfoContextWrapper } from "../../components/context/SummaryInfoContext";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Schulz.Ai",
  description: "GPT powered CRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SummaryInfoContextWrapper>
        <html lang="en">
          <body className={inter.className}>
            <Toaster />
            <div>{children}</div>
          </body>
        </html>
      </SummaryInfoContextWrapper>
    </ClerkProvider>
  );
}
