import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '~/utils/supabase';
import { type Database } from '~/types/supabase';
import { withRetry } from '~/utils/retryUtils';
import { motion } from "framer-motion";
import { FileText, ExternalLink, PictureInPicture } from "lucide-react";

type Article = Database['public']['Tables']['articles']['Row'];

interface Resource {
  type: string;
  title: string;
  html?: string;
  image?: string;
  url?: string;
  description?: string;
  text?: string;
}

const ResourcePreview = ({ resource }: { resource: Resource }) => {
  switch (resource.type) {
    case 'link':
      return (
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-blue-500">{resource.title}</span>
          </div>
          {resource.description && (
            <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
          )}
        </a>
      );
    
    case 'text':
      return (
        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm font-medium">{resource.title}</span>
          </div>
          <div className="text-sm text-gray-600 whitespace-pre-wrap">{resource.text}</div>
          {resource.description && (
            <p className="text-xs text-gray-500 mt-2">{resource.description}</p>
          )}
        </div>
      );
    
    case 'html':
      return (
        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm font-medium">{resource.title}</span>
          </div>
          <div 
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: resource.html ?? '' }}
          />
          {resource.description && (
            <p className="text-xs text-gray-500 mt-2">{resource.description}</p>
          )}
        </div>
      );
    
    case 'image':
      return (
        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PictureInPicture size={16} className="text-gray-500" />
            <span className="text-sm font-medium">{resource.title}</span>
          </div>
          {resource.image && (
            <img 
              src={resource.image} 
              alt={resource.title}
              className="w-full h-auto rounded-md"
            />
          )}
          {resource.description && (
            <p className="text-xs text-gray-500 mt-2">{resource.description}</p>
          )}
        </div>
      );
    
    default:
      return null;
  }
};

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
        {/* Hero Section */}
        <section className="relative pt-28 pb-12 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]">
              <div className="absolute inset-0 bg-sky-900 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,black_100%)]"></div>
            </div>
          </div>
          
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb navigation */}
              <nav className="flex items-center gap-2 text-sm text-sky-200/80 mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link 
                  href="/articles" 
                  className="hover:text-white transition-colors"
                >
                  Articles
                </Link>
                {article.category && (
                  <>
                    <span>/</span>
                    <Link 
                      href={`/articles/${article.category}`} 
                      className="hover:text-white transition-colors"
                    >
                      {article.category}
                    </Link>
                  </>
                )}
              </nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4"
              >
                <FileText className="w-4 h-4 text-sky-300" />
                <span className="text-sm font-medium text-sky-100">{article.category}</span>
              </motion.div>

              {/* Article Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl md:text-3xl font-bold text-white mb-3"
              >
                {article.title}
              </motion.h1>

              {/* Article Description */}
              {article.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base md:text-lg text-sky-100/90"
                >
                  {article.description}
                </motion.p>
              )}

              {/* Article Meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-4 text-sm text-sky-200/80"
              >
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </section>

        {/* Article Content and Resources */}
        <div className="container mx-auto px-4 py-12">
          {Array.isArray(article.resources) && article.resources.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
              {/* Main Content */}
              <div className="max-w-3xl">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Article Keywords */}
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

              {/* Resources Section */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold">Resources</h2>
                  </div>
                  <div className="p-4 space-y-3">
                    {(article.resources as Resource[]).map((resource, index) => (
                      <ResourcePreview key={index} resource={resource} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Centered content when no resources
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Article Keywords */}
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
