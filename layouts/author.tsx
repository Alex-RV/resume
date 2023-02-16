import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Suspense } from 'react';
import Container from '../components/Container';


export default function author({author}) {
  const { resolvedTheme, setTheme } = useTheme();
  console.log(author.author)
  return (
    <Container
      title={`${author.author.name} – Alex Riabov`}
      description="Author Info"
      type="article">
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {author.author.name == null ? "Title" : author.author.name}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2  md:items-center">
          <div className="flex items-center rotate-90">
            <Image
              alt="Alex Riabov"
              height={150}
              width={150}
              sizes="20vw"
              src={author.author.authorImage == null ? "/logo.jpg" : resolvedTheme == "dark" ? author.author.authorDarkImage : author.author.authorImage}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {author.author.name == null ? "Alex" : author.author.name}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {author.author.publishedAt == null ? "Jan 1, 2023" :new Date(author.author.publishedAt).toLocaleString('en-us', { year:"numeric", month:"short",day: 'numeric'})}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {author.author.posts.title}
            </p>
          </div>
        </div>
        </article>
        </Container>
  )
}
