import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center border border-black p-8 rounded-none bg-white">
      <h1 className="text-4xl md:text-6xl font-serif mb-4 uppercase tracking-tighter">
        Welcome
      </h1>
      <div className="w-full h-px bg-black my-4"></div>
      <p className="text-xl md:text-2xl font-sans uppercase">
        {session.user?.name || "Author"}
      </p>
      <div className="w-full h-px bg-black my-4"></div>
      <p className="text-sm font-sans mt-4 max-w-md text-center">
        Use the navigation to manage your editions and texts. Remember, we build the culture we consume.
      </p>
    </div>
  );
}
