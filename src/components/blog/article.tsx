import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import { useRouter } from "next/router";
import type { Database } from "~/types/supabase";

type Article = Database["public"]["Tables"]["articles"]["Row"];

const ArticleHead = ({
  article,
  descriptionTxt,
}: {
  article: Article;
  descriptionTxt?: string;
}) => {
  const router = useRouter();
  const canonicalUrl = `https://yallburru.org.au${router.asPath}`;
  const description = descriptionTxt ?? article.description ?? article.title;
  const image = article.imageurl ?? "/banner.webp";

  return (
    <Head>
      <title>{article.title ?? "Loading..."} | Yallburru Community Services</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={article.keywords?.join(", ") ?? ""} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={article.title || "Loading..."} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.title || "Loading..."} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

const Article = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    //if (slug) {
      void fetchArticle(slug as string);
    //}
  }, []) //, [slug]);

  const fetchArticle = async (slug: string) => {
    /*const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      console.error("Error fetching article:", error);
      setError("Article not found");
      return;
    }*/
const data = {
  id: 1,
  author_id: null,
  slug: "welcome-to-yallburru",
  title: "Welcome to Yallburru Community Services",
  description: "Learn about our mission to support and strengthen Indigenous communities through innovative programs and services.",
  content: "<p>Welcome to Yallburru Community Services! We're excited to share our journey with you.</p>\n\n<h2>Our Mission</h2>\n<p>At Yallburru, we believe in creating lasting positive change in Indigenous communities through culturally sensitive and innovative approaches to service delivery.</p>\n\n<h2>What We Do</h2>\n<p>Our services span across multiple areas:</p>\n<ul>\n  <li>Community health and wellbeing programs</li>\n  <li>Cultural education and preservation initiatives</li>\n  <li>Youth mentorship and development</li>\n  <li>Elder support services</li>\n</ul>\n\n<h3>Featured Programs</h3>\n<p>We're currently running several exciting programs that demonstrate our commitment to community development:</p>\n\n<blockquote>\n  <p>\"Connection to culture is connection to self. Through our programs, we aim to strengthen these vital bonds.\"</p>\n  <footer>— Elder Mary Johnson</footer>\n</blockquote>\n\n<h2>Get Involved</h2>\n<p>There are many ways to support our mission:</p>\n<ol>\n  <li>Volunteer in our community programs</li>\n  <li>Attend our cultural events</li>\n  <li>Support our initiatives</li>\n  <li>Share our story</li>\n</ol>\n\n<p>This is just the beginning of our story. We invite you to join us on this journey of community, culture, and connection.</p>",
  category: "Community",
  subcategory: "Announcements",
  keywords: ["community", "indigenous", "services", "culture", "welcome"],
  imageurl: "/banner.webp", //"https://images.unsplash.com/photo-1523730205978-59fd1b2965e3",
  published: true,
  created_at: "2024-03-20T00:00:00.000Z",
  updated_at: "2024-03-20T00:00:00.000Z"
}
    setArticle(data);
  };

  const breadcrumbs = [
    {
      name: "News",
      href: "/news",
      current: false,
    },
    {
      name: article?.category ?? "...",
      href: `/news/category/${article?.category.toLowerCase()}`,
      current: false,
    },
    ...(article?.subcategory ? [{
      name: article.subcategory,
      href: `/news/category/${article.category.toLowerCase()}/${article.subcategory.toLowerCase()}`,
      current: false,
    }] : []),
    {
      name: article?.title ?? "Loading...",
      href: `/news/${article?.slug}`,
      current: true,
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-max">
          <h2 className="text-2xl font-bold text-red-600">Article Not Found</h2>
          <p className="mt-2 text-gray-600">{`The article you're looking for doesn't exist.`}</p>
          <Link 
            href="/news" 
            className="mt-4 inline-block text-sky-600 hover:text-sky-500"
          >
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleHead article={article} />
      
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-4">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {item.current ? (
                  <span className="text-gray-500">{item.name}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sky-600 hover:text-sky-500"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose prose-sky max-w-none">
          <h1>{article.title}</h1>
          
          <div className="flex items-center gap-4 not-prose mb-8">
            <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
            <time className="text-gray-500 text-sm">
              {new Date(article.updated_at ?? article.created_at).toLocaleDateString()}
            </time>
          </div>

          {article.imageurl && (
            <Image
              src={article.imageurl}
              alt={article.title}
              width={800}
              height={500}
              className="rounded-lg mb-8"
              priority
            />
          )}

          <div 
            dangerouslySetInnerHTML={{ __html: article.content }} 
            className="mt-8"
          />
        </article>
      </main>
    </div>
  );
};

export default Article;