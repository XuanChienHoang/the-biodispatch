import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-pill">
            <span className="pulse-dot"></span>
            <span>Biomedical Intelligence & Metabolomic Profiling</span>
          </div>
          <h1 className="hero-title">
            The BioDispatch
          </h1>
          <p className="hero-subtitle">
            Rigorous, evidence-based deep dives at the intersection of biotechnology, metabolomics, 
            and next-generation healthcare engineering. Curated by Dr. Xuan Chien Hoang (Dr. rer. nat., University of Hamburg).
          </p>
        </div>
      </section>

      <section className="container">
        <div className="posts-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
              <div className="post-meta">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="tags-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-badge">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
