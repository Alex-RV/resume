import { sanityClient } from '../sanity.config';
import { postSlugsQuery, authorSlugsQuery } from '../lib/queries';

const createSitemap = (slugs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://alex-riabov.vercel.app/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;
export async function getServerSideProps({ res }) {
  const allPosts = await sanityClient.fetch(postSlugsQuery);
  const allAuthors = await sanityClient.fetch(authorSlugsQuery);
  const allPages = [
    ...allPosts.map((slug) => `projects/${slug}`),
    ...allAuthors.map((slug) => `author/${slug}`),
    ...[
      '',
      'about',
      'index',
      'experience',
      'ip',
      'projects',
      'skills'
    ]
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}
