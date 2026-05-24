import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function TextsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const texts = await prisma.text.findMany({
    where: {
      authors: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      edition: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white text-black h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 border-b border-black pb-4">
        <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter">
          Texts
        </h1>
        <Link
          href="/dashboard/texts/new"
          className="border border-black px-4 py-2 bg-black text-white hover:bg-white hover:text-black rounded-none transition-colors min-h-[44px] flex items-center justify-center font-sans uppercase text-sm"
        >
          New Text
        </Link>
      </div>

      <div className="space-y-4 flex-1">
        {texts.length === 0 ? (
          <p className="font-sans text-sm p-4 border border-black uppercase text-center">
            No texts found.
          </p>
        ) : (
          texts.map((text) => (
            <div
              key={text.id}
              className="border border-black p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-black hover:text-white transition-colors group"
            >
              <div>
                <h2 className="text-xl font-serif mb-2">{text.title}</h2>
                <div className="font-sans text-xs uppercase opacity-70 group-hover:opacity-100 flex items-center space-x-2">
                  <span>{text.slug}</span>
                  <span>•</span>
                  <span>{text.edition.title}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";