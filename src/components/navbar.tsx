"use client";
import { MainNav } from "@/app/(dashboard)/_components/main-nav";
import { Search } from "@/app/(dashboard)/_components/search";
import { UserNav } from "@/app/(dashboard)/_components/user-nav";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="w-full max-w-screen-2xl mx-auto flex h-16 items-center px-4">
        <h1 className="font-bold text-lg">Codeyoung Noah Admin</h1>
        <MainNav className="mx-auto flex-1 justify-center" />
        <div className="flex items-center space-x-4">
          <Search />
          {/* <ThemeToggle /> */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}
