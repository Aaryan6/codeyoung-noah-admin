"use client";
import { Search } from "@/app/(dashboard)/_components/search";
import { UserNav } from "@/app/(dashboard)/_components/user-nav";

export default function Navbar() {
  return (
    <div className='border-b'>
      <div className='w-full max-w-7xl mx-auto flex h-16 items-center px-4'>
        <h1 className='font-bold text-lg'>Codeyoung Noah Admin</h1>
        {/* <MainNav className='mx-6 ml-auto' /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          {/* <ThemeToggle /> */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}
