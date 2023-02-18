import Image from 'next/image';
import { Suspense } from 'react';
import BlockContent from '@sanity/block-content-to-react';

import Container from '../components/Container';
import { urlFor } from '../sanity.config';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { serializers } from '../lib/serializers'

export default function Project({post}) {
  console.log(post)
  const { resolvedTheme, setTheme } = useTheme();
  const authorName = post.author?.name || "Alex";
  const authorImage = post.author?.image || "/logo.jpg";
  const authorImageDarkTheme = post.author?.imageDarkTheme;

  const publishedAt = post.publishedAt
    ? new Date(post.publishedAt).toLocaleString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Jan 1, 2023";

  return (
    <Container
      title={`${post.title} – Alex Riabov`}
      description={post.description == null ? "Description" : post.description}
      type="article">
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title == null ? "Title" : post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2  md:items-center">
          <Link href={`../author/${post.author.slug.current}`}>
          <div className="flex items-center rotate-90">
            <Image
              alt="Alex Riabov"
              height={32}
              width={32}
              sizes="20vw"
              src={post.author == null ? "/logo.jpg" : resolvedTheme == "dark" ? authorImageDarkTheme == null ? urlFor(authorImage).url() : urlFor(authorImageDarkTheme).url() : urlFor(authorImage).url()}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {post.author == null ? "Alex" : authorName}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {post.publishedAt == null ? "Jan 1, 2023" : publishedAt}
            </p>
          </div>
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
          </p>
          <div className="mt-10 text-black dark:text-white">
          <BlockContent dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!} blocks={post.body == null ? "No content yet" : post.body} serializers={serializers} />
          </div>
        </div>
        
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          </div>
          <div className="mt-8">
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <a
              href="/#contactForm"
            >
              {'Contact me'}
            </a>
            {` • `}
            <a
              href={post.githubLink == null ? "https://github.com/Alex-RV" : post.githubLink.current}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Suggest Change'}
            </a>
          </div>
        </Suspense>
      </article>
    </Container>
  );
}
