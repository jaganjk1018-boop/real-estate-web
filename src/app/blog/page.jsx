'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Share2, 
  Sparkles, 
  Tag
} from 'lucide-react';
import { BLOG_POSTS_DATA } from '../../data/blogPosts';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Investment Guides', label: 'Investment Guides' },
    { id: 'Real Estate Tips', label: 'Real Estate Tips' },
    { id: 'Market News', label: 'Market News' },
  ];

  const filteredPosts = BLOG_POSTS_DATA.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#FAF8F5] text-[#1F2937]">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#1E3A5F] text-xs font-bold shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-[#8A5A00]" />
          <span>JK Realty Private Intel & Research</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A5F] font-serif leading-tight">
          Real Estate Insights & <span className="gold-gradient-text">Investment Guides</span>
        </h1>
        <p className="text-sm sm:text-base text-[#374151] font-medium">
          Authoritative intelligence on architectural trends, jumbo mortgages, and prime waterfront asset performance.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-[#1E3A5F] text-white shadow-md'
                : 'bg-white text-[#4B5563] hover:text-[#1E3A5F] border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 flex flex-col justify-between hover:border-[#D4AF37] transition-all group shadow-card"
          >
            <div className="space-y-4">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#1E3A5F] border border-gray-200 shadow-sm backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 pt-2 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-[#4B5563] font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8A5A00]" />
                    {post.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8A5A00]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1E3A5F] font-serif group-hover:text-[#8A5A00] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-[#374151] font-normal leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#1E3A5F] font-semibold border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Author & Read Button */}
            <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5 pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]/60"
                />
                <div className="text-[11px]">
                  <span className="text-[#1F2937] block font-bold">{post.author.name}</span>
                  <span className="text-[#4B5563] text-[10px] font-medium">{post.author.role}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(post)}
                className="pt-4 text-xs font-bold text-[#1E3A5F] hover:text-[#8A5A00] flex items-center gap-1 transition-colors"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1F2937]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FAF8F5] z-20">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white text-[#1E3A5F] border border-gray-200 shadow-2xs">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl bg-white border border-gray-200 text-[#1E3A5F] hover:text-[#8A5A00] transition-all shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Reader Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#4B5563] font-semibold">
                  <span>{activeArticle.publishedAt}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  <span>•</span>
                  <span>By {activeArticle.author.name}, {activeArticle.author.role}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A5F] font-serif">
                  {activeArticle.title}
                </h2>
              </div>

              <div className="max-w-none text-sm text-[#374151] leading-relaxed whitespace-pre-line space-y-4 font-normal">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1E3A5F]">{activeArticle.author.name}</h4>
                    <span className="text-[10px] text-[#4B5563] font-medium">{activeArticle.author.role} • JK Realty</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedToast(true);
                    setTimeout(() => setCopiedToast(false), 2500);
                  }}
                  className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-gray-100 text-[#1E3A5F] border border-gray-200 flex items-center gap-1.5 text-xs font-bold transition-all shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedToast ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
