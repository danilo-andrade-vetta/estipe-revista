"use client";

import { createText } from "@/app/actions/text";
import { useRouter } from "next/navigation";

interface Edition {
  id: string;
  title: string;
}

export default function NewTextClient({ editions }: { editions: Edition[] }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await createText(formData);
    if (res.success) {
      router.push("/dashboard/texts");
    } else {
      alert(res.error || "Something went wrong");
    }
  }

  return (
    <div className="bg-white text-black h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-8 border-b border-black pb-4">
        <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter">
          New Text
        </h1>
      </div>

      <form action={handleSubmit} className="space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="e.g. The Cultural Scene"
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
              placeholder="e.g. the-cultural-scene"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="editionId" className="font-sans text-sm uppercase mb-2">
            Edition
          </label>
          <select
            id="editionId"
            name="editionId"
            required
            className="border border-black p-3 bg-white text-black rounded-none focus:outline-none focus:ring-1 focus:ring-black font-sans min-h-[44px] appearance-none"
          >
            <option value="" disabled selected>
              Select an Edition
            </option>
            {editions.map((edition) => (
              <option key={edition.id} value={edition.id}>
                {edition.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="excerpt" className="font-sans text-sm uppercase mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            className="border border-black p-3 bg-white text-black rounded-none focus:outline-none focus:ring-1 focus:ring-black font-sans resize-none"
            placeholder="A brief summary of the text..."
          ></textarea>
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="content" className="font-sans text-sm uppercase mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={15}
            required
            className="border border-black p-3 bg-white text-black rounded-none focus:outline-none focus:ring-1 focus:ring-black font-sans flex-1 resize-y min-h-[300px]"
            placeholder="Write your text here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full border border-black p-4 bg-black text-white hover:bg-white hover:text-black rounded-none transition-colors font-sans uppercase tracking-widest min-h-[44px]"
        >
          Create Text
        </button>
      </form>
    </div>
  );
}