"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createEdition(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  if (!title || !slug) {
    throw new Error("Title and Slug are required");
  }

  try {
    await prisma.edition.create({
      data: {
        title,
        slug,
        description,
        isPublished: false, // Default to unpublished
      },
    });

    revalidatePath("/dashboard/editions");
    return { success: true };
  } catch (error) {
    console.error("Failed to create edition:", error);
    return { success: false, error: "Failed to create edition" };
  }
}
