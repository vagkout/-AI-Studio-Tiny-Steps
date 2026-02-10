
import React, { useEffect } from 'react';
import { Item, UsefulLink } from '../types';

interface ItemDetailViewProps {
  item: Item | null;
  onClose: () => void;
}

const LinkIcon = ({ type }: { type?: UsefulLink['type'] }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'expert':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'video':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export const ItemDetailView: React.FC<ItemDetailViewProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const isEssential = item.type === 'essential';

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold text-sm transition-colors group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to App
          </button>
          
          <div className="hidden sm:flex items-center gap-2">
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${isEssential ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'}`}>
              {item.category}
            </span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
              {item.startAgeMonths}m {isEssential ? 'Essential' : 'Milestone'}
            </span>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
        <div className="space-y-16">
          
          {/* Hero Header */}
          <header className="text-center space-y-8">
            <div className={`inline-flex w-24 h-24 rounded-3xl items-center justify-center text-5xl shadow-sm border ${isEssential ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'}`}>
              {item.icon}
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight px-4">
                {item.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
                {item.description}
              </p>
            </div>
          </header>

          {/* Main Content Body */}
          <div className="grid gap-16">
            
            {/* Detailed Explanation */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${isEssential ? 'text-amber-600' : 'text-blue-600'}`}>
                  {isEssential ? 'About this Essential' : 'Understanding this Stage'}
                </h3>
                <div className="h-px w-full bg-gray-100" />
              </div>
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg sm:text-xl font-light">
                  {item.fullDescription || (isEssential ? "This curated item is chosen for its specific developmental benefits. It's designed to support your child's natural growth trajectory during this window." : "Detailed guidance for this specific milestone is currently being curated by our specialists. Check back soon for deeper insights into your child's development.")}
                </p>
              </div>
            </section>

            {/* Resources Grid */}
            {item.links && item.links.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] whitespace-nowrap">
                    Resources & Guides
                  </h3>
                  <div className="h-px w-full bg-gray-100" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {item.links.map((link, idx) => {
                    const isSocial = link.type === 'instagram' || link.type === 'video';
                    const isExpert = link.type === 'expert';

                    return (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col p-6 rounded-2xl border transition-all shadow-sm hover:shadow-md group ${
                          isSocial ? 'bg-pink-50/20 border-pink-100 hover:border-pink-200' : 
                          isExpert ? 'bg-blue-50/20 border-blue-100 hover:border-blue-200' :
                          'bg-white border-gray-100 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center flex-wrap gap-2 pr-4">
                             <span className="text-base font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                              {link.label}
                            </span>
                             <div className={`${isSocial ? 'text-pink-500' : isExpert ? 'text-blue-500' : 'text-gray-400'}`}>
                               <LinkIcon type={link.type} />
                             </div>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium mb-4">
                          {link.description || "Authoritative Guide & Recommendations"}
                        </p>
                        
                        {(link.author || link.authorIcon) && (
                          <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {link.authorIcon ? (
                                <img 
                                  src={link.authorIcon} 
                                  alt={link.author || 'Author'} 
                                  className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 shadow-sm"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm">
                                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              )}
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {link.author || 'Contributor'}
                              </span>
                            </div>
                            {isSocial && (
                              <span className="text-[10px] font-bold text-pink-500 uppercase">View Page</span>
                            )}
                          </div>
                        )}
                      </a>
                    );
                  })}
                </div>
              </section>
            )}

          </div>

          {/* Footer Disclaimer */}
          <footer className="pt-20 border-t border-gray-100">
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="inline-flex p-2 bg-gray-50 rounded-full">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 italic leading-relaxed">
                Medical Disclaimer: This information is for educational purposes only and does not constitute professional medical advice. Always consult with your pediatrician regarding your child's specific developmental needs.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
