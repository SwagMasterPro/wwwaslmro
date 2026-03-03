"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ArticleContentProps {
  content: string | ReactNode;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <section className="section-lg surface-primary">
      <div className="container-default">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            {typeof content === "string" ? (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              content
            )}
          </div>
        </motion.article>
      </div>

      <style jsx global>{`
        .article-content h2 {
          font-family: var(--font-heading), Georgia, serif;
          font-size: var(--font-size-3xl);
          font-weight: var(--font-semibold);
          line-height: var(--leading-tight);
          color: var(--text-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .article-content h3 {
          font-family: var(--font-heading), Georgia, serif;
          font-size: var(--font-size-2xl);
          font-weight: var(--font-semibold);
          line-height: var(--leading-snug);
          color: var(--text-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          font-size: var(--font-size-lg);
          line-height: var(--leading-relaxed);
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .article-content ul,
        .article-content ol {
          font-size: var(--font-size-lg);
          line-height: var(--leading-relaxed);
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          padding-left: 1.75rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content strong {
          color: var(--text-primary);
          font-weight: var(--font-semibold);
        }

        .article-content a {
          color: var(--color-primary-600);
          text-decoration: underline;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: var(--color-primary-700);
        }

        .article-content blockquote {
          border-left: 4px solid var(--color-primary-600);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }

        .article-content code {
          background-color: var(--surface-tertiary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          font-family: monospace;
        }

        .article-content pre {
          background-color: var(--surface-tertiary);
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .article-content pre code {
          background: none;
          padding: 0;
        }

        .article-content img {
          border-radius: 0.75rem;
          margin: 2rem 0;
          width: 100%;
          height: auto;
        }
      `}</style>
    </section>
  );
}
