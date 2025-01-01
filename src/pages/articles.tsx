import Head from "next/head";
import { useState } from "react";
import { supabase } from "~/utils/supabase";
import { ArrowRight, Calendar, Search, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  imageurl?: string;
  category: string;
  subcategory: string | null;
}

interface ArticlesPageProps {
  articles: Article[];
  categories: string[];
}

export async function getStaticProps() {
  // Fetch articles
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('id, title, description, slug, created_at, imageurl, category, subcategory')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (articlesError) {
    console.error('Error fetching articles:', articlesError);
    return {
      props: {
        articles: [],
        categories: [],
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  }

  // Extract unique categories
  const categories = [...new Set(articles?.map(article => article.category) || [])];

  return {
    props: {
      articles: articles || [],
      categories: categories || [],
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
}

export default function ArticlesPage({articles, categories }: ArticlesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //const categories:string[] = ["Test Category", "Test Subcategory"];

  //some test articles ~ 20 articles
  /*const articles:Article[] = [
    {
      id: "1",
      title: "Test Article 1",
      description: "Testing layout of display",
      slug: "dummy-article-1",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "2",
      title: "Test Article 2",
      description: "Testing layout of display",
      slug: "dummy-article-2",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "3",
      title: "Test Article 3",
      description: "Testing layout of display",
      slug: "dummy-article-3",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "4",
      title: "Test Article 4",
      description: "Testing layout of display",
      slug: "dummy-article-4",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "5",
      title: "Test Article 5",
      description: "Testing layout of display",
      slug: "dummy-article-5",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    }, 
    {
      id: "6",
      title: "Test Article 6",
      description: "Testing layout of display",
      slug: "dummy-article-6",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "7",
      title: "Test Article 7",
      description: "Testing layout of display",
      slug: "dummy-article-7",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "8",
      title: "Test Article 8",
      description: "Testing layout of display",
      slug: "dummy-article-8",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "9",
      title: "Test Article 9",
      description: "Testing layout of display",
      slug: "dummy-article-9",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "10",
      title: "Test Article 10",
      description: "Testing layout of display",
      slug: "dummy-article-10",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "11",
      title: "Test Article 11",
      description: "Testing layout of display",
      slug: "dummy-article-11",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "12",
      title: "Test Article 12",
      description: "Testing layout of display",
      slug: "dummy-article-12",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "13",
      title: "Test Article 13",
      description: "Testing layout of display",
      slug: "dummy-article-13",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "14",
      title: "Test Article 14",
      description: "Testing layout of display",
      slug: "dummy-article-14",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "15",
      title: "Test Article 15",
      description: "Testing layout of display",
      slug: "dummy-article-15",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "16",
      title: "Test Article 16",
      description: "Testing layout of display",
      slug: "dummy-article-16",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "17",
      title: "Test Article 17",
      description: "Testing layout of display",
      slug: "dummy-article-17",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "18",
      title: "Test Article 18",
      description: "Testing layout of display",
      slug: "dummy-article-18",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "19",
      title: "Test Article 19",
      description: "Testing layout of display",
      slug: "dummy-article-19",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
    {
      id: "20",
      title: "Test Article 20",
      description: "Testing layout of display",
      slug: "dummy-article-20",
      created_at: "2024-01-01",
      category: "Test Category",
      subcategory: "Test Subcategory",
    },
  ]*/

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Split articles into featured and regular
  const [featuredArticle, ...remainingArticles] = filteredArticles;

  return (
    <>
      <Head>
        <title>Articles - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Stay informed with the latest news and updates from Yallburru Community Services." 
        />
      </Head>

      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-sky-900/30 via-transparent to-transparent animate-pulse delay-700"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl pb-32 pt-32 mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent">
              Latest Articles
            </h1>
            <p className="text-xl text-sky-100 mb-12 font-light">
              Stay informed with our latest news and updates
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-sky-400 group-focus-within:text-sky-300 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-sky-400/20 
                         text-white placeholder-sky-300/70 focus:outline-none focus:ring-2 
                         focus:ring-sky-400/50 focus:border-transparent shadow-lg shadow-sky-950/20
                         transition-all duration-300"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-sky-400/0 
                            rounded-xl blur-xl group-focus-within:via-sky-400/20 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50">
          <svg className="absolute bottom-0 w-full h-16 text-gray-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="currentColor" d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"></path>
          </svg>
        </div>
      </section>

      <main className="bg-gray-50">
        <div className="container mx-auto px-4 -mt-8">
          {/* Category Filter */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-wrap items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl
                         shadow-sm border border-gray-100 text-gray-700 hover:bg-sky-50 hover:border-sky-100
                         transition-all duration-300"
              >
                <Filter size={18} className="text-sky-600" />
                Filter by Category
              </button>
              
              {isFilterOpen && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        category === selectedCategory
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                          : 'bg-gray-50 text-gray-700 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-700 
                           rounded-xl text-sm hover:bg-sky-100 transition-colors duration-300"
                >
                  {selectedCategory}
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="max-w-6xl mx-auto pb-12">
            {/* Featured Article */}
            {featuredArticle && (
              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="group block mb-12 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    {featuredArticle.imageurl ? (
                      <>
                        <Image
                          src={featuredArticle.imageurl}
                          alt={featuredArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
                        <Image
                          src="/Logo.webp"
                          alt="Yallburru Logo"
                          width={120}
                          height={120}
                          className="rounded-full opacity-50"
                        />
                      </div>
                    )}
                    {featuredArticle.category && (
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/95 rounded-xl text-sm font-medium text-sky-900 shadow-lg">
                          {featuredArticle.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 md:pr-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar size={16} className="text-sky-600" />
                      {new Date(featuredArticle.created_at).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                      {featuredArticle.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sky-600 font-medium group-hover:gap-3 transition-all">
                      Read Full Article
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Regular Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group transform hover:-translate-y-1 transition-all duration-500"
                >
                  <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl h-full">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {article.imageurl ? (
                        <>
                          <Image
                            src={article.imageurl}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
                          <Image
                            src="/Logo.webp"
                            alt="Yallburru Logo"
                            width={80}
                            height={80}
                            className="rounded-full opacity-50"
                          />
                        </div>
                      )}
                      {article.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-white/95 rounded-xl text-sm font-medium text-sky-900 shadow-md">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar size={16} className="text-sky-600" />
                        {new Date(article.created_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-3">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {article.description}
                      </p>
                      <div className="inline-flex items-center gap-1 text-sky-600 font-medium group-hover:gap-2 transition-all">
                        Read Article
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Enhanced Empty State */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sky-50 flex items-center justify-center">
                    <Search size={32} className="text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No Articles Found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm
                      ? `No articles match your search for "${searchTerm}"`
                      : selectedCategory
                      ? `No articles found in the "${selectedCategory}" category`
                      : "No articles available at the moment."}
                  </p>
                  {(searchTerm || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory(null);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-sky-50 text-sky-600 
                               rounded-xl hover:bg-sky-100 transition-colors"
                    >
                      Clear Filters
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
