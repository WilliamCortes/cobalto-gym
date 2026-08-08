import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorTitle: string;
  category: string;
  keywords: string;
  image: string;
  readingTime: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      return getPostBySlug(slug)!;
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Edwin González",
    authorTitle: data.authorTitle ?? "Coach & CEO, Gym Cobalto",
    category: data.category ?? "Entrenamiento",
    keywords: data.keywords ?? "",
    image: data.image ?? "/images/gym-interior.jpg",
    readingTime: `${Math.ceil(rt.minutes)} min de lectura`,
    content,
  };
}
