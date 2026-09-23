import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | The BioDispatch`,
    description: post.excerpt,
    authors: [{ name: post.author }],
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="article-header">
        <div className="container" style={{ maxWidth: "780px" }}>
          <div className="post-meta">
            <Link href="/" style={{ color: "var(--accent)", fontWeight: 600 }}>
              ← Back to Dispatches
            </Link>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="article-title">{post.title}</h1>
          <p className="post-excerpt" style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>
            {post.excerpt}
          </p>

          <div className="author-block">
            <div className="author-avatar">CH</div>
            <div className="author-info">
              <h4>{post.author}</h4>
              <p>{post.authorRole}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>

          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/" style={{ color: "var(--accent)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
