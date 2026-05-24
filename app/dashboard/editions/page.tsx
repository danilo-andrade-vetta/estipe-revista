import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function EditionsPage() {
  const editions = await prisma.edition.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white text-black h-full flex flex-col">
      <div className="flex justify-between items-center mb-8 border-b border-black pb-4">
        <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter">
          Editions
        </h1>
        <Link
          href="/dashboard/editions/new"
          className="border border-black px-4 py-2 bg-black text-white hover:bg-white hover:text-black rounded-none transition-colors min-h-[44px] flex items-center justify-center font-sans uppercase text-sm"
        >
          New Edition
        </Link>
      </div>

      <div className="space-y-4 flex-1">
        {editions.length === 0 ? (
          <p className="font-sans text-sm p-4 border border-black uppercase text-center">
            No editions found.
          </p>
        ) : (
          editions.map((edition) => (
            <div
              key={edition.id}
              className="border border-black p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-black hover:text-white transition-colors group"
            >
              <div>
                <h2 className="text-xl font-serif mb-2">{edition.title}</h2>
                <p className="font-sans text-xs uppercase opacity-70 group-hover:opacity-100">
                  {edition.slug}
                </p>
              </div>
              <div className="mt-4 md:mt-0 font-sans text-xs uppercase border border-current px-2 py-1">
                {edition.isPublished ? "Published" : "Draft"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";