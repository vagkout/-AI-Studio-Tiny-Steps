
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_ITEMS } from './data';
import { AGE_GROUPS, Item } from './types';
import { MilestoneCard } from './components/MilestoneCard';
import { ItemDetailView } from './components/ItemDetailView';

type ViewMode = 'pulse' | 'library';

const PLAY_IMAGE_URL = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('pulse');
  const [selectedAge, setSelectedAge] = useState(6);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [viewingItem, setViewingItem] = useState<Item | null>(null);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);
  
  const maxAge = 72;
  const sliderRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const thumbSize = 28;

  // Use IntersectionObserver for precise "stuck" detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel is not intersecting, the header below it has hit the top
        setIsHeaderStuck(!entry.isIntersecting);
      },
      { threshold: [0], rootMargin: '0px 0px 0px 0px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = useMemo(() => 
    Array.from(new Set(ALL_ITEMS.map(item => item.category))).sort(), 
  []);

  if (!activeCategory && categories.length > 0) setActiveCategory(categories[0]);

  const displayAge = () => {
    if (selectedAge === 0) return "Newborn";
    if (selectedAge < 12) return `${selectedAge} Months`;
    const years = Math.floor(selectedAge / 12);
    const months = selectedAge % 12;
    return `${years} Year${years > 1 ? 's' : ''}${months > 0 ? ` ${months}m` : ''}`;
  };

  const changePoints = useMemo(() => {
    const points = new Set(ALL_ITEMS.filter(i => i.type === 'milestone').map(item => item.startAgeMonths));
    return Array.from(points).filter(p => p <= maxAge).sort((a, b) => a - b);
  }, []);

  const { spotlightItems, context, ageEssentials } = useMemo(() => {
    const spotlight: { item: Item; offset: number }[] = [];
    const contextItems: Item[] = [];
    const essentials: Item[] = [];

    ALL_ITEMS.forEach(item => {
      const isMilestone = item.type === 'milestone' || !item.type;
      
      if (isMilestone) {
        const offset = item.startAgeMonths - selectedAge;
        if (offset >= -2 && offset <= 5) {
          spotlight.push({ item, offset });
        }
        if (item.startAgeMonths <= selectedAge) {
          contextItems.push(item);
        }
      } else {
        const start = item.startAgeMonths || 0;
        const end = item.endAgeMonths || 999;
        if (selectedAge >= start && selectedAge <= end) {
          essentials.push(item);
        }
      }
    });

    spotlight.sort((a, b) => a.offset - b.offset || a.item.category.localeCompare(b.item.category));
    return { spotlightItems: spotlight, context: contextItems, ageEssentials: essentials };
  }, [selectedAge]);

  const { libMilestones, libEssentials } = useMemo(() => {
    const milestones = ALL_ITEMS.filter(i => i.category === activeCategory && (i.type === 'milestone' || !i.type))
      .sort((a, b) => a.startAgeMonths - b.startAgeMonths);
    const essentials = ALL_ITEMS.filter(i => i.category === activeCategory && i.type === 'essential')
      .sort((a, b) => a.startAgeMonths - b.startAgeMonths);
    return { libMilestones: milestones, libEssentials: essentials };
  }, [activeCategory]);

  const getThumbCenter = (val: number) => {
    const pct = val / maxAge;
    return `calc(${thumbSize / 2}px + ${pct} * (100% - ${thumbSize}px))`;
  };

  const renderMarkers = () => (
    <div className={`absolute left-0 right-0 h-3 pointer-events-none transition-all duration-500 ${isHeaderStuck ? 'top-1' : 'top-3.5'}`}>
      <div className="relative w-full h-full">
        {changePoints.map(point => {
          const isActive = point === selectedAge;
          const position = getThumbCenter(point);
          return (
            <div 
              key={point}
              className="absolute top-0 bottom-0 flex items-center group pointer-events-auto cursor-pointer"
              style={{ left: position, transform: `translateX(-50%)` }}
              onClick={() => setSelectedAge(point)}
            >
              <div className="w-6 h-10 bg-transparent" />
              <div className={`absolute w-0.5 rounded-full transition-all duration-300 pointer-events-none ${
                  isActive ? 'bg-blue-600 h-5 scale-x-150 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-gray-300 h-2 group-hover:bg-blue-400 group-hover:h-4 group-hover:w-1'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-7xl md:text-9xl tracking-tighter text-gray-900 leading-[0.85]">
              <span className="font-black">Tiny</span>
              <span className="font-serif-brand italic font-medium text-blue-600 block sm:inline sm:ml-2">Steps</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Every leap, every giggle, every milestone—curated for your child's specific age and development.
            </p>
          </div>
          
          <div className="flex-1 w-full lg:max-w-xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-[4rem] blur-2xl group-hover:from-blue-500/20 transition-all duration-700" />
              <div className="relative aspect-[4/3] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={PLAY_IMAGE_URL} 
                  alt="Child exploring"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white">
                  <p className="text-sm font-bold">"Development is a journey, not a race. We provide the map."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Switcher (Centered below Hero) */}
      <div className="flex justify-center -mt-8 relative z-30 mb-6">
        <div className="inline-flex p-1.5 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <button 
            onClick={() => setViewMode('pulse')} 
            className={`px-10 py-3 rounded-xl text-sm font-black transition-all ${viewMode === 'pulse' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Pulse
          </button>
          <button 
            onClick={() => setViewMode('library')} 
            className={`px-10 py-3 rounded-xl text-sm font-black transition-all ${viewMode === 'library' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Library
          </button>
        </div>
      </div>

      {viewMode === 'pulse' ? (
        <>
          {/* Sentinel for sticky header detection */}
          <div ref={sentinelRef} className="h-px w-full pointer-events-none" />
          
          <div className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-4 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-top-4 ${isHeaderStuck ? 'py-3' : 'pt-2 pb-10'}`}>
            <div className="max-w-4xl mx-auto">
              <div className={`flex items-end justify-between transition-all duration-500 ${isHeaderStuck ? 'mb-2' : 'mb-8'}`}>
                <div className="flex flex-row items-baseline gap-4">
                  {!isHeaderStuck && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block transition-all">Current Viewpoint</span>
                  )}
                  <div className={`font-black tabular-nums text-gray-900 tracking-tighter transition-all duration-500 ${isHeaderStuck ? 'text-2xl' : 'text-5xl'}`}>
                    {displayAge()}
                  </div>
                  {isHeaderStuck && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 transition-all opacity-60">Viewpoint</span>
                  )}
                </div>
              </div>
              <div className={`relative transition-all duration-500 ${isHeaderStuck ? 'pt-2 pb-2' : 'pt-6 pb-8'}`} ref={sliderRef}>
                {!isHeaderStuck && (
                  <div className={`absolute z-20 pointer-events-none transition-all duration-300 flex flex-col items-center top-[-10px]`} style={{ left: getThumbCenter(selectedAge), transform: `translateX(-50%)` }}>
                    <div className={`px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-full shadow-lg transition-transform ${isDragging ? 'scale-125' : 'scale-100'}`}>{selectedAge}m</div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rotate-45 -mt-0.5 shadow-lg" />
                  </div>
                )}
                {renderMarkers()}
                <input 
                  type="range" 
                  min="0" 
                  max={maxAge} 
                  value={selectedAge} 
                  onMouseDown={() => setIsDragging(true)} 
                  onMouseUp={() => setIsDragging(false)} 
                  onChange={(e) => setSelectedAge(parseInt(e.target.value))} 
                  className={`relative z-10 w-full rounded-full appearance-none cursor-pointer focus:outline-none bg-gray-100/50 transition-all duration-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-lg ${isHeaderStuck ? 'h-1.5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5' : 'h-3 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7'}`} 
                />
              </div>
            </div>
          </div>

          <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
            <section className="animate-in fade-in duration-700">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-gray-900">Milestone Spotlight</h2>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              {spotlightItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {spotlightItems.map(({ item, offset }) => (
                    <div key={item.id} className="relative flex flex-col group/card">
                      <div className="mb-2 px-1">
                        <span className={`text-[9px] font-black uppercase tracking-wider ${offset === 0 ? 'text-blue-600' : offset < 0 ? 'text-gray-400' : 'text-amber-500'}`}>
                          {offset === 0 ? '● NEW THIS MONTH' : offset < 0 ? `${Math.abs(offset)}m ago` : `Coming in ${offset}m`}
                        </span>
                      </div>
                      <MilestoneCard item={item} isNew={offset === 0} onClick={setViewingItem} className={offset < 0 ? 'opacity-60 hover:opacity-100' : ''} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl py-12 text-center">
                  <p className="text-sm font-medium text-gray-400">No specific developmental markers for this exact window.</p>
                </div>
              )}
            </section>

            {ageEssentials.length > 0 && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-black text-gray-900">Essentials Toolkit</h2>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">Top Rated Gear</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ageEssentials.map(item => (
                    <div key={item.id} onClick={() => setViewingItem(item)} className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4">
                      <div className="relative">
                        <span className="text-4xl group-hover:scale-110 transition-transform block">{item.icon}</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-xs">
                          <span className="text-[8px] font-black text-blue-600">{item.startAgeMonths}m</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 truncate">{item.title}</h4>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                           <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.category}</span>
                           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Essential</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl font-black text-gray-900">Active History</h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="space-y-16">
                {AGE_GROUPS.map(group => {
                  const groupItems = context.filter(item => item.startAgeMonths >= group.minMonths && item.startAgeMonths <= group.maxMonths);
                  if (groupItems.length === 0) return null;
                  const groupCategories = Array.from(new Set(groupItems.map(i => i.category)));
                  return (
                    <div key={group.id} className="relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 rounded-full" />
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">{group.label}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {groupCategories.map(cat => (
                          <div key={cat} className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><span>{cat}</span><div className="h-px flex-1 bg-gray-50" /></h4>
                            <div className="space-y-2">
                              {groupItems.filter(i => i.category === cat).map(item => (
                                <div key={item.id} onClick={() => setViewingItem(item)} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 cursor-pointer transition-all group">
                                  <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                                  <h5 className="text-xs font-bold text-gray-700">{item.title}</h5>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </>
      ) : (
        <main className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-3 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105' : 'bg-white border border-gray-100 text-gray-500 hover:border-gray-300'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Developmental Timeline</h3>
              <div className="space-y-12 relative">
                {libMilestones.length > 0 && <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gray-100 hidden sm:block" />}
                {libMilestones.length > 0 ? (
                  libMilestones.map((item, idx) => (
                    <div key={item.id} className="relative flex flex-col sm:flex-row gap-6 sm:gap-12 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="flex-shrink-0 relative z-10 pt-2">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600 shadow-sm">{item.startAgeMonths}m</div>
                      </div>
                      <div onClick={() => setViewingItem(item)} className="flex-1 bg-white border border-gray-100 p-6 rounded-3xl hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer group">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors">{item.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">{item.title}</h3>
                            </div>
                            <p className="text-gray-500 leading-relaxed font-medium line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 px-8 border border-dashed border-gray-200 rounded-[2.5rem] text-center bg-gray-50/30">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm border border-gray-100">✨</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Resource-Focused Category</h4>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                      The <strong>{activeCategory}</strong> category is curated as a toolkit of essential items rather than specific developmental milestones. Explore the recommended resources to the right.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Helpful Essentials</h3>
              <div className="space-y-4">
                {libEssentials.map(item => (
                  <div key={item.id} onClick={() => setViewingItem(item)} className="p-5 bg-blue-50/30 border border-blue-100/50 rounded-2xl hover:bg-blue-50 hover:shadow-sm cursor-pointer transition-all group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="relative">
                        <span className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">{item.icon}</span>
                        <div className="absolute -top-1 -right-1 px-1 bg-blue-600 text-white text-[8px] font-black rounded-full border border-white">
                          {item.startAgeMonths}m+
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{item.title}</h4>
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{item.category} Essential</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                ))}
                {libEssentials.length === 0 && <p className="text-sm text-gray-400 italic">No toolkit items added yet.</p>}
              </div>
            </div>
          </div>
        </main>
      )}

      <ItemDetailView item={viewingItem} onClose={() => setViewingItem(null)} />
      <footer className="py-24 border-t border-gray-100 bg-white text-center mt-auto">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">TinySteps Milestones • Professional Guidance Recommended</p>
      </footer>
    </div>
  );
};

export default App;
