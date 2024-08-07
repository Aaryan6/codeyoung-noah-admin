"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors",
            pathname === href
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

const links = [
  { href: "/", label: "Overview" },
  { href: "/analytics-doubt-solve", label: "Doubt Solving" },
  { href: "/analytics-questions", label: "Question Analytics" },
  { href: "/student-analytics", label: "Student Metrics" },
];
