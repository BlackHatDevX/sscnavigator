'use client';

import { useState, useEffect } from 'react';

interface Totals {
  UR: number;
  OBC: number;
  SC: number;
  ST: number;
  EWS: number;
  TOTAL: number;
}

interface Post {
  regionId: string;
  postName: string;
  jobRequirements: string;
  qualificationDescriptions: string[];
  vacancy: {
    UR: number;
    OBC: number;
    SC: number;
    ST: number;
    EWS: number;
    TOTAL: number;
  };
}

interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function Home() {
  const [totals, setTotals] = useState<Totals | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [qualificationFilter, setQualificationFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [vacancySort, setVacancySort] = useState<'none' | 'high-to-low' | 'low-to-high'>('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 10;
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [views, setViews] = useState<number | null>(null);
  const [showTotalsPopup, setShowTotalsPopup] = useState(false);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SSC Navigator',
    description: 'Search and filter SSC Phase 14 post vacancies by region, qualification, and job requirements.',
    url: 'https://sscnavigator.vercel.app',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    author: {
      '@type': 'Person',
      name: 'jashgro',
    },
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const fetchPosts = async (page: number) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: postsPerPage.toString(),
      });
      if (searchTerm) params.append('search', searchTerm);
      if (qualificationFilter) params.append('qualification', qualificationFilter);
      if (regionFilter) params.append('region', regionFilter);
      if (vacancySort !== 'none') params.append('sort', vacancySort);

      const response = await fetch(`/api/posts?${params.toString()}`);
      const data: PostsResponse = await response.json();
      setPosts(data.data);
      setTotalPosts(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    async function fetchTotals() {
      try {
        const response = await fetch('/api/totals');
        const data = await response.json();
        setTotals(data);
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    }

    async function fetchViews() {
      try {
        const response = await fetch('/api/views');
        const data = await response.json();
        setViews(data.count);
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    }

    fetchTotals();
    fetchViews();
    setLoading(false);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts(1);
  }, [searchTerm, qualificationFilter, regionFilter, vacancySort]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  const regions = ['Central Region', 'Eastern Region', 'Western Region', 'Northern Region', 'Southern Region', 'North Eastern Region', 'Karnataka Kerala Region', 'Madhya Pradesh Region', 'North Western Region'];

  return (
    <div className="min-h-screen font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="fixed bottom-4 right-4 sm:top-4 sm:bottom-auto backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-black/5 dark:border-white/10 px-4 py-2 rounded-2xl shadow-xl text-sm text-zinc-600 dark:text-zinc-400 z-50">
        Views: {views ?? '...'}
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-3">
                SSC Navigator
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Search and filter SSC Phase 14 post vacancies
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/BlackHatDevX/sscnavigator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80 transition-all hover:scale-105 active:scale-95"
                aria-label="GitHub repository"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80 transition-all hover:scale-105 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">
            Made by{' '}
            <a
              href="https://www.instagram.com/jash_gro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              jashgro
            </a>{' '}
            |{' '}
            <a
              href="https://www.linkedin.com/in/jash-gro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              LinkedIn
            </a>
            {' '}• If you need any help or API, feel free to DM me
          </div>
        </header>

        {totals && (
          <>
            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">UR</div>
                <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {totals.UR}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">OBC</div>
                <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {totals.OBC}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">SC</div>
                <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {totals.SC}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">ST</div>
                <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {totals.ST}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">EWS</div>
                <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {totals.EWS}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">TOTAL</div>
                <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {totals.TOTAL}
                </div>
              </div>
            </div>
            <div className="md:hidden mb-6">
              <button
                onClick={() => setShowTotalsPopup(true)}
                className="w-full backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-between"
              >
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">View Vacancy Totals</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-600 dark:text-zinc-400"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          </>
        )}

        <div className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            Filter Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Search (Post Name / Requirements)
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="Enter search term..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Qualification Keyword
              </label>
              <input
                type="text"
                value={qualificationFilter}
                onChange={(e) => setQualificationFilter(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="e.g., Chemistry, Diploma..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Region
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              >
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Sort by Vacancy
              </label>
              <select
                value={vacancySort}
                onChange={(e) => setVacancySort(e.target.value as 'none' | 'high-to-low' | 'low-to-high')}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              >
                <option value="none">No Sort</option>
                <option value="high-to-low">High to Low</option>
                <option value="low-to-high">Low to High</option>
              </select>
            </div>
          </div>
          <div className="mt-5 text-sm text-zinc-500 dark:text-zinc-500">
            Showing {posts.length} of {totalPosts} posts (Page {currentPage} of {totalPages})
          </div>
        </div>

        <div className="space-y-5">
          {posts.map((post, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                    {post.postName}
                  </h3>
                  <span className="text-sm text-zinc-500 dark:text-zinc-500">
                    {post.regionId}
                  </span>
                </div>
                <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Total: {post.vacancy.TOTAL}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Job Requirements
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {post.jobRequirements}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Qualifications
                </h4>
                {post.qualificationDescriptions.map((qual, idx) => (
                  <p key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {qual}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {post.vacancy.UR > 0 && (
                  <span className="text-xs font-medium bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300">
                    UR: {post.vacancy.UR}
                  </span>
                )}
                {post.vacancy.OBC > 0 && (
                  <span className="text-xs font-medium bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300">
                    OBC: {post.vacancy.OBC}
                  </span>
                )}
                {post.vacancy.SC > 0 && (
                  <span className="text-xs font-medium bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300">
                    SC: {post.vacancy.SC}
                  </span>
                )}
                {post.vacancy.ST > 0 && (
                  <span className="text-xs font-medium bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300">
                    ST: {post.vacancy.ST}
                  </span>
                )}
                {post.vacancy.EWS > 0 && (
                  <span className="text-xs font-medium bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300">
                    EWS: {post.vacancy.EWS}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 dark:hover:bg-black/90 transition-all hover:scale-105 active:scale-95 font-medium"
            >
              Previous
            </button>
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);

              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }

              if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                  pages.push('...');
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }

              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push('...');
                }
                pages.push(totalPages);
              }

              return pages.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-4 py-2 text-zinc-500 dark:text-zinc-500"
                    >
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={`px-4 py-2.5 rounded-full backdrop-blur-xl border transition-all hover:scale-105 active:scale-95 font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                        : 'bg-white/70 dark:bg-black/70 text-zinc-900 dark:text-white border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/90'
                    }`}
                  >
                    {page}
                  </button>
                );
              });
            })()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 dark:hover:bg-black/90 transition-all hover:scale-105 active:scale-95 font-medium"
            >
              Next
            </button>
          </div>
        )}

        {showTotalsPopup && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTotalsPopup(false)}
          >
            <div
              className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-black/5 dark:border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Vacancy Totals</h3>
                <button
                  onClick={() => setShowTotalsPopup(false)}
                  className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-600 dark:text-zinc-400"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">UR</div>
                  <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {totals?.UR}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">OBC</div>
                  <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {totals?.OBC}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">SC</div>
                  <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {totals?.SC}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">ST</div>
                  <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {totals?.ST}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">EWS</div>
                  <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {totals?.EWS}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">TOTAL</div>
                  <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {totals?.TOTAL}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
