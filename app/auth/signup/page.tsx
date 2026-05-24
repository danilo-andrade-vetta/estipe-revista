'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }

      // Successful registration, redirect to signin
      router.push('/auth/signin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans text-black dark:bg-white dark:text-black">
      <div className="w-full max-w-md border border-black p-8">
        <h1 className="mb-8 font-serif text-3xl font-bold uppercase tracking-tight">
          Sign Up
        </h1>

        {error && (
          <div className="mb-6 border border-black bg-red-50 p-4 text-sm font-bold text-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-black"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-none border border-black px-4 py-3 text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="J. Doe"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-black"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-none border border-black px-4 py-3 text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="name@example.com"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-black"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-none border border-black px-4 py-3 text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-none border border-black bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-8 border-t border-black pt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link
            href="/auth/signin"
            className="font-bold text-black hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
