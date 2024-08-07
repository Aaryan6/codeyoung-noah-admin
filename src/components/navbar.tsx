"use client";
import { MainNav } from "@/components/main-nav";
import { DatePickerWithRange } from "./date-picker";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="w-full max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="font-bold text-lg">Codeyoung Noah Admin</h1>
        <MainNav className="mx-auto flex-1 justify-center" />
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <DatePickerWithRange />
        </div>
      </div>
    </div>
  );
}
