import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '~/utils/supabase';
import { type Database } from '~/types/supabase';
import { withRetry } from '~/utils/retryUtils';
type Article = Database['public']['Tables']['articles']['Row'];

interface ArticlePageProps {
  article: Article | null;
  error?: string;
}

export default function ArticlePage({ article, error }: ArticlePageProps) {
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Generate meta tags for SEO
  const metaTitle = article.title ?? 'Article';
  const metaDescription = article.description ?? 'Read this article on our site';
  const keywords = article.keywords?.join(', ') ?? '';

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {keywords && <meta name="keywords" content={keywords} />}

        {/* Open Graph tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        {article.imageurl && (
          <meta property="og:image" content={article.imageurl} />
        )}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {article.imageurl && (
          <meta name="twitter:image" content={article.imageurl} />
        )}
      </Head>

      <article className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <Link 
              href={`/articles/${article.category}`} 
              className="hover:text-gray-900"
            >
              {article.category}
            </Link>
            {article.subcategory && (
              <>
                <span>/</span>
                <Link 
                  href={`/articles/${article.category}/${article.subcategory}`}
                  className="hover:text-gray-900"
                >
                  {article.subcategory}
                </Link>
              </>
            )}
          </nav>

          {/* Article header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-xl text-gray-600 mb-4">
                {article.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {/* Article content */}
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article footer */}
          {article.keywords && article.keywords.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Only get published articles for static paths
  type ArticleFields = Pick<Article, 'category' | 'subcategory' | 'slug'>;
  const response = await withRetry<ArticleFields[]>(() => 
    new Promise((resolve) => {
      supabase
        .from('articles')
        .select('category, subcategory, slug')
        .then(resolve);
    })
  );

  const articles = response.data as ArticleFields[] ?? [];
  const paths = articles.map(article => ({
    params: { slug: [article.category, article.slug] }
  }));

  return {
    paths,
    fallback: 'blocking' // Allow fallback for new articles
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  try {
    const slugParts = params?.slug as string[];
    
    if (!slugParts || slugParts.length !== 2) {
      return {
        notFound: true
      };
    }

    const category = slugParts[0];
    const slug = slugParts[1];

    if (!category || !slug) {
      return {
        notFound: true
      };
    }

    const response = await withRetry<Article>(() =>
      new Promise((resolve) => {
        supabase
          .from('articles')
          .select('*')
          .eq('category', category)
          .eq('slug', slug)
          .single()
          .then(resolve);
      })
    );

    if (response.error) {
      throw response.error;
    }

    const article = response.data as Article;
    if (!article) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        article
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true
    };
  }
};
