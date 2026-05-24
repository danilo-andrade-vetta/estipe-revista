"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createText(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const editionId = formData.get("editionId") as string;

  if (!title || !slug || !content || !editionId) {
    throw new Error("Title, Slug, Content, and Edition ID are required");
  }

  try {
    await prisma.text.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        editionId,
        authors: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/dashboard/texts");
    return { success: true };
  } catch (error) {
    console.error("Failed to create text:", error);
    return { success: false, error: "Failed to create text" };
  }
}
