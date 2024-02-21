"use client";
import { MainNav } from "@/app/(dashboard)/_components/main-nav";
import { Search } from "@/app/(dashboard)/_components/search";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "@/app/(dashboard)/_components/user-nav";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  if (path == "/auth") return;
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <h1 className="font-bold text-lg">QuizApp</h1>
        <MainNav className="mx-6 ml-auto" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
