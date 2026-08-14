import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Check,
  Terminal,
  ChevronRight,
  Copy,
  Sparkles,
  Home,
  BookOpen
} from "lucide-react";
import { ALL_35_BLOGS, type BlogPost } from "./components/BlogSection";
import AuroraBackground from "./components/aurora-background";
import SeoHead from "./components/SeoHead";

interface BlogDetailPageProps {
  slug: string;
  onNavigateHome?: () => void;
  onNavigateBlogList?: () => void;
  onSelectPost?: (slug: string) => void;
}

export default function BlogDetailPage({
  slug,
  onNavigateHome,
  onNavigateBlogList,
  onSelectPost
}: BlogDetailPageProps) {
  const [copiedCodeText, setCopiedCodeText] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const post: BlogPost | undefined = ALL_35_BLOGS.find(
    (b) => b.slug === slug || b.id === slug
  );

  // Scroll listener for reading progress bar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeText(code);
    setTimeout(() => setCopiedCodeText(null), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/blog/${post?.slug || slug}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const navigateToBlog = (targetSlug: string) => {
    if (onSelectPost) {
      onSelectPost(targetSlug);
    } else {
      window.location.href = `/blog/${targetSlug}`;
    }
  };

  const navigateToList = () => {
    if (onNavigateBlogList) {
      onNavigateBlogList();
    } else {
      window.location.href = "/blog";
    }
  };

  const navigateToHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = "/";
    }
  };

  if (!post) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Article Not Found
        </h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          The requested technical case study could not be located. Browse all 38+ engineering guides in our main directory.
        </p>
        <button
          type="button"
          onClick={navigateToList}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 font-bold text-sm text-white shadow-lg cursor-pointer hover:scale-105 transition-all"
        >
          View All Technical Blogs
        </button>
      </div>
    );
  }

  const relatedPosts = ALL_35_BLOGS.filter(
    (b) => b.category === post.category && b.id !== post.id
  ).slice(0, 3);

  return (
    <>
      <SeoHead
        page="blog-article"
        articleSlug={post.slug}
        articleTitle={post.seoTitle || post.title}
        articleDescription={post.metaDescription || post.excerpt}
        articlePublishDate={post.publishDate}
        articleAuthor={post.author}
      />

      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 z-50 transition-all duration-75 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div
        className="w-full min-h-screen bg-zinc-950 text-white pt-20 pb-24 selection:bg-red-500 selection:text-white"
        itemScope
        itemType="https://schema.org/TechArticle"
      >
        <AuroraBackground>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-zinc-400 mb-8 flex-wrap"
            >
              <button
                type="button"
                onClick={navigateToHome}
                className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" /> Home
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={navigateToList}
                className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" /> Tech Blog
              </button>
              <span>/</span>
              <span className="text-red-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
                {post.category}
              </span>
            </nav>

            {/* Back Button & Action Bar */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={navigateToList}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                title="Copy Article URL"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-red-400" />
                    <span>Share Case Study</span>
                  </>
                )}
              </button>
            </div>

            {/* Article Hero Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-zinc-900 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <img
                src={post.image}
                alt={post.seoTitle || post.title}
                className="w-full h-full object-cover"
                itemProp="image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-lg">
                {post.category}
              </div>
            </motion.div>

            {/* Metadata Badges */}
            <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4 flex-wrap border-b border-zinc-800/80 pb-4">
              <span
                className="flex items-center gap-1.5 text-zinc-200 font-semibold"
                itemProp="author"
              >
                <User className="w-4 h-4 text-red-400" /> {post.author} ({post.authorRole})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5" itemProp="datePublished">
                <Calendar className="w-4 h-4 text-red-400" /> {post.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-400" /> {post.readTime}
              </span>
            </div>

            {/* Main Article Title */}
            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight"
              itemProp="headline"
            >
              {post.title}
            </h1>

            {/* Excerpt / Overview */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8 p-4 rounded-xl bg-zinc-900/40 border-l-4 border-red-500">
              {post.excerpt}
            </p>

            {/* Technical Outline Table of Contents */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 mb-10 shadow-xl">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Technical Architecture Outline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {post.tableOfContents.map((item, idx) => (
                  <a
                    key={item}
                    href={`#section-${idx}`}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg bg-zinc-950/60 hover:bg-zinc-800/80 border border-white/5 font-medium hover:text-red-400 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Detailed Content Sections */}
            <div className="space-y-10" itemProp="articleBody">
              {post.content.map((sec, idx) => (
                <div
                  key={sec.sectionTitle}
                  id={`section-${idx}`}
                  className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl shadow-lg"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 text-xs font-extrabold flex items-center justify-center border border-red-500/30">
                      {idx + 1}
                    </span>
                    {sec.sectionTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line mb-4 font-normal">
                    {sec.text}
                  </p>

                  {sec.codeSnippet && (
                    <div className="my-5 rounded-2xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs overflow-x-auto text-emerald-400 shadow-inner relative group/code">
                      <div className="text-[10px] uppercase text-zinc-500 mb-3 border-b border-zinc-800 pb-2 flex justify-between items-center">
                        <span className="flex items-center gap-1.5 font-bold tracking-wider">
                          <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Architecture Blueprint & Code
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400 font-bold px-2 py-0.5 bg-zinc-900 rounded border border-zinc-800">
                            {sec.codeSnippet.language}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(sec.codeSnippet!.code)}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] flex items-center gap-1 transition-all cursor-pointer font-bold"
                          >
                            {copiedCodeText === sec.codeSnippet.code ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy Snippet
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                      <pre className="overflow-x-auto whitespace-pre leading-relaxed">
                        <code>{sec.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Core Engineering Takeaways Box */}
            <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-red-500/40 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Core Engineering Metrics & Takeaways
              </h3>
              <ul className="space-y-3">
                {post.keyTakeaways.map((takeaway) => (
                  <li
                    key={takeaway}
                    className="text-xs sm:text-sm text-zinc-200 flex items-start gap-3 font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Case Studies */}
            {relatedPosts.length > 0 && (
              <div className="my-12 pt-8 border-t border-zinc-800">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-red-400 mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Related Engineering Deep Dives
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => navigateToBlog(rel.slug)}
                      className="text-left p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-900 transition-all group/rel cursor-pointer"
                    >
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full aspect-video rounded-lg object-cover mb-3 border border-zinc-800"
                      />
                      <div className="text-[10px] text-red-400 font-bold mb-1 uppercase tracking-wider">
                        {rel.category}
                      </div>
                      <div className="text-xs font-bold text-white group-hover/rel:text-red-400 line-clamp-2 transition-colors">
                        {rel.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords & Tags Footer */}
            <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Indexed SEO Keywords & Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((k) => (
                    <span
                      key={k}
                      className="px-3 py-1 rounded-lg bg-zinc-900 text-xs font-medium text-zinc-300 border border-zinc-800 hover:border-red-500/40 transition-colors"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={navigateToList}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all cursor-pointer shrink-0 self-start sm:self-auto"
              >
                Back to All Articles
              </button>
            </div>
          </div>
        </AuroraBackground>
      </div>
    </>
  );
}
