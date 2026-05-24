# 🤖 Project Context & AI Guidelines: Revista de Artes

## 1. Project Overview
- **Name:** Estipe Revista
- **Type:** Digital Arts & Culture Magazine
- **Goal:** A digital publication platform with a brutalist, typography-centric design.

## 2. Tech Stack & Architecture
- **Framework:** Next.js 14/15 (App Router)
- **Language:** TypeScript (Strict typing required)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (via Docker locally, Supabase in Production)
- **ORM:** Prisma (v6.x - standard instantiation, NO driver adapters)
- **Authentication:** NextAuth.js (v4) with Prisma Adapter & Credentials Provider (bcryptjs)
- **Deployment Target:** AWS Amplify / Vercel

## 3. Design System & UI Guidelines (CRITICAL)
- **Aesthetic:** "e-flux" inspired Brutalism / Academic Minimalism.
- **Palette:** Strict monochrome. Pure black (`bg-black`, `text-black`, `border-black`) and pure white (`bg-white`, `text-white`). No grays unless absolutely necessary for disabled states.
- **Typography:**
  - Headings/Titles: Classic Serif font (e.g., Times New Roman, Playfair).
  - UI Elements/Body/Small Text: Utilitarian Sans-Serif font (e.g., Arial, Helvetica, Inter).
- **Layout & Shapes:**
  - High contrast, heavy use of whitespace.
  - Strict grid alignments.
  - **Sharp edges only:** `rounded-none` everywhere.
  - Thin black borders (`border border-black`) to define and separate UI elements, inputs, and sections.
  - NO shadows (`shadow-none`), NO gradients, NO rounded corners.
- **Mobile-First:** Ensure all layouts stack beautifully on small screens. Buttons and touch targets must be at least `44px` high for mobile usability (`min-h-[44px]`, `p-4`).

## 4. Current State & Changelog
- **[Done]** Init Next.js + Tailwind + TypeScript.
- **[Done]** Prisma schema configured (User, Edition, Text, Tag).
- **[Done]** NextAuth implemented with Credentials Provider.
- **[Done]** Custom Brutalist Sign In and Sign Up pages created.
- **[Next Task]** Build the Author Dashboard (`/dashboard`) to manage Texts and Editions.

## 5. Development Rules for AI Agents
1. Always read this file before suggesting large structural changes.
2. Ensure all new components strictly follow the Brutalist Design System.
3. Keep server-side and client-side code properly separated (`"use client"` only when hooks/interactivity are needed).
4. Update the "Current State & Changelog" section when completing major milestones.