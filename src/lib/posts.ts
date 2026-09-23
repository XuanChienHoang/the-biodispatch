import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  authorRole: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

export interface PostData extends PostMetadata {
  content: string;
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "2026-09-23",
        excerpt: data.excerpt || "",
        author: data.author || "Dr. Xuan Chien Hoang",
        authorRole: data.authorRole || "Dr. rer. nat. | University of Hamburg",
        tags: data.tags || [],
        readingTime: data.readingTime || "5 min read",
        featured: data.featured || false,
      };
    });

  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(slug: string): PostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "2026-09-23",
      excerpt: data.excerpt || "",
      author: data.author || "Dr. Xuan Chien Hoang",
      authorRole: data.authorRole || "Dr. rer. nat. | University of Hamburg",
      tags: data.tags || [],
      readingTime: data.readingTime || "5 min read",
      featured: data.featured || false,
      content,
    };
  } catch {
    return null;
  }
}
