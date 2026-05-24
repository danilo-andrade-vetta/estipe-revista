"use client";

import { createEdition } from "@/app/actions/edition";
import { useRouter } from "next/navigation";

export default function NewEditionPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await createEdition(formData);
    if (res.success) {
      router.push("/dashboard/editions");
    } else {
      alert(res.error || "Something went wrong");
    }
  }

  return (
    <div className="bg-white text-black h-full flex flex-col max-w-2xl mx-auto">
      <div className="mb-8 border-b border-black pb-4">
        <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter">
          New Edition
        </h1>
      </div>

      <form action={handleSubmit} className="space-y-6 flex-1">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-sans text-sm uppercase mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="border border-black p-3 bg-white text-black rounded-none focus:outline-none focus:ring-1 focus:ring-black font-sans min-h-[44px]"
            placeholder="e.g. Issue 01: Origins"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="slug" className="font-sans text-sm uppercase mb-2">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            className="border border-black p-3 bg-white text-black rounded-none focus:outline-none focus:ring-1 focus:ring-black font-sans min-h-[44px]"
            placeholder="e.g. issue-01-origins"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-sans text-sm uppercase mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="border border-black p-3 bg-white text-black rounded-none focus:outline-none focus:ring-1 focus:ring-black font-sans resize-none"
            placeholder="A brief description of this edition..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full border border-black p-4 bg-black text-white hover:bg-white hover:text-black rounded-none transition-colors font-sans uppercase tracking-widest min-h-[44px]"
        >
          Create Edition
        </button>
      </form>
    </div>
  );
}