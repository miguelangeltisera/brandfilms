
import React from 'react';

interface ContentPageProps {
  title: string;
  content: React.ReactNode;
}

export const ContentPage: React.FC<ContentPageProps> = ({ title, content }) => {
  return (
    <article className="prose prose-invert prose-h1:text-pink-400 prose-h2:text-cyan-400 prose-h2:border-b prose-h2:border-cyan-400/30 prose-h2:pb-2 prose-strong:text-pink-400 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 max-w-none">
      <h1>{title}</h1>
      <div>{content}</div>
    </article>
  );
};
