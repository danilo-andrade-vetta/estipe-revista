import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black dark:bg-white dark:text-black">
      <header className="flex w-full items-center justify-between border-b border-black p-6">
        <div className="font-serif text-2xl font-bold uppercase tracking-widest">
          Estipe Revista
        </div>
        <nav className="flex items-center gap-6">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase">
                {session.user?.name || session.user?.email}
              </span>
              <Link
                href="/api/auth/signout"
                className="border border-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-xs font-bold uppercase tracking-wider hover:underline"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="border border-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <h1 className="max-w-4xl font-serif text-5xl font-bold uppercase leading-tight tracking-tighter md:text-7xl">
          Contemporary Art & Discourse
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-gray-800">
          A platform for rigorous aesthetic inquiry and critical text.
          Embracing the brutalist tradition of stark contrasts and
          uncompromising form.
        </p>
      </main>
    </div>
  );
}
