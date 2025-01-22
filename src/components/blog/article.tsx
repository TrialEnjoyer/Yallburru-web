import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import { useRouter } from "next/router";
import type { Database } from "~/types/supabase";
import { ExternalLink, FileText } from 'lucide-react';

type Article = Database["public"]["Tables"]["articles"]["Row"];

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
            <FileText size={16} className="text-gray-500" />
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

const ArticleHtml = ({ content }: { content: string }) => {
  // Function to apply styles to the HTML content
  const applyStyles = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Style headers
    doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((header) => {
      header.classList.add(
        "font-bold",
        "mt-8",
        "mb-4",
        "leading-tight",
      );

      switch (header.tagName) {
        case "H1":
          header.classList.add(
            "text-4xl",
            "text-sky-900",
            "border-sky-900",
            "pb-2",
          );
          break;
        case "H2":
          header.classList.add("text-3xl", "text-sky-900");
          break;
        case "H3":
          header.classList.add("text-2xl", "text-sky-800");
          break;
        case "H4":
          header.classList.add("text-xl", "text-sky-800");
          break;
        case "H5":
          header.classList.add("text-lg", "text-sky-700");
          break;
        case "H6":
          header.classList.add("text-base", "text-sky-700");
          break;
      }
    });

    // Style paragraphs
    doc.querySelectorAll("p").forEach((paragraph) => {
      paragraph.classList.add("mb-4", "leading-relaxed", "text-gray-600");
    });

    // Style lists
    doc.querySelectorAll("ul, ol").forEach((list) => {
      list.classList.add("mb-4", "pl-5", "text-gray-600");
    });

    // Style list items
    doc.querySelectorAll("li").forEach((item) => {
      item.classList.add("mb-2");
    });

    // Style links
    doc.querySelectorAll("a").forEach((link) => {
      link.classList.add("text-sky-600", "hover:text-sky-500");
    });

    // Style code blocks
    doc.querySelectorAll("pre").forEach((pre) => {
      pre.classList.add(
        "m-5",
        "bg-gray-50",
        "p-4",
        "rounded-lg",
        "mb-4",
        "overflow-x-auto",
        "border",
        "border-gray-200"
      );
    });

    // Style inline code
    doc.querySelectorAll("code").forEach((code) => {
      if (code.parentElement?.tagName !== "PRE") {
        code.classList.add(
          "bg-gray-50",
          "px-1",
          "py-0.5",
          "rounded",
          "text-sm",
          "border",
          "border-gray-200"
        );
      }
    });

    // Style blockquotes
    doc.querySelectorAll("blockquote").forEach((quote) => {
      quote.classList.add(
        "border-l-4",
        "border-sky-500",
        "pl-4",
        "italic",
        "text-gray-600",
        "my-4"
      );
    });

    return doc.body.innerHTML;
  };

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: applyStyles(content) }}
    />
  );
};

const Article = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    void fetchArticle(slug as string);
  }, []);

  const fetchArticle = async (slug: string) => {
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
      imageurl: "/banner.webp",
      published: true,
      created_at: "2024-03-20T00:00:00.000Z",
      updated_at: "2024-03-20T00:00:00.000Z",
      resources: [
        {
          type: 'link',
          title: 'Our Programs',
          url: 'https://yallburru.org.au/services',
          description: 'Learn more about our community programs'
        },
        {
          type: 'text',
          title: 'Get Involved',
          text: 'Contact us at support@yallburru.org.au to learn more about volunteer opportunities.',
          description: 'Ways to support our community'
        }
      ]
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
      shortName: article?.category?.slice(0, 3) ?? "...",
      href: `/news/category/${article?.category?.toLowerCase()}`,
      current: false,
    },
    ...(article?.subcategory ? [{
      name: article.subcategory,
      shortName: article.subcategory.slice(0, 3),
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
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 max-w-3xl mx-auto lg:max-w-6xl">
          <ol className="flex items-center space-x-1">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="sm:mx-1 text-gray-400">/</span>}
                {item.current ? (
                  <span className="text-gray-500 truncate max-w-[200px]">{item.name}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sky-600 hover:text-sky-500"
                  >
                    {index === 0 || index === breadcrumbs.length - 1 ? (
                      item.name
                    ) : (
                      <>
                        <span className="hidden sm:inline">{item.name}</span>
                        <span className="sm:hidden">{item.shortName ?? item.name}</span>
                      </>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4 max-w-6xl mx-auto">
          <article className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-sky-900 sm:text-4xl mb-4">
                {article.title}
              </h1>
              
              <div className="mb-8 flex items-center space-x-4">
                <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
                  {article.category}
                </span>
                <time className="text-gray-500 text-sm">
                  {new Date(article.updated_at ?? article.created_at).toLocaleDateString()}
                </time>
              </div>

              {article.imageurl && (
                <div className="mb-8">
                  <Image
                    src={article.imageurl}
                    alt={article.title}
                    width={1200}
                    height={675}
                    className="rounded-lg w-full"
                    priority
                  />
                </div>
              )}

              <ArticleHtml content={article.content} />

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

          {/* Resources Section */}
          {article.resources && article.resources.length > 0 && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Resources</h2>
                </div>
                <div className="p-4 space-y-3">
                  {article.resources.map((resource, index) => (
                    <ResourcePreview key={index} resource={resource} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Article;