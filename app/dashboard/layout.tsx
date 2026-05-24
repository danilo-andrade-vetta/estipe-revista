"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col md:flex-row">
      {/* Sidebar / Top Navigation */}
      <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-serif mb-8 border-b border-black pb-2">Estipe</h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/dashboard"
                className="block hover:bg-black hover:text-white border border-black p-2 rounded-none transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/editions"
                className="block hover:bg-black hover:text-white border border-black p-2 rounded-none transition-colors"
              >
                Editions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/texts"
                className="block hover:bg-black hover:text-white border border-black p-2 rounded-none transition-colors"
              >
                Texts
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full border border-black p-2 bg-black text-white hover:bg-white hover:text-black rounded-none transition-colors min-h-[44px]"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
