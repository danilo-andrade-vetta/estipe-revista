import prisma from "@/lib/prisma";
import NewTextClient from "./NewTextClient";

export default async function NewTextPage() {
  const editions = await prisma.edition.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true },
  });

  return <NewTextClient editions={editions} />;
}

export const dynamic = "force-dynamic";