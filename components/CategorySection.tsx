
import React, { useEffect, useState } from 'react';
import { Category, SubCategory, SubCategoryStyle } from '../types';
import { ItemCard } from './ItemCard';

interface CategorySectionProps {
  category: Category;
  uiStyle: SubCategoryStyle;
  currentAgeMonths: number;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, uiStyle, currentAgeMonths }) => {
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;
  
  // Find subcategory matching the global age
  const matchedSub = hasSubCategories 
    ? category.subCategories?.find(s => currentAgeMonths >= s.startMonth && currentAgeMonths < s.endMonth)
    : null;

  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  // Synchronize when global age changes, but allow manual override
  useEffect(() => {
    if (matchedSub) {
      setActiveSubId(matchedSub.id);
    }
  }, [currentAgeMonths, matchedSub?.id]);

  const activeSub = hasSubCategories 
    ? category.subCategories?.find(s => s.id === (activeSubId || (matchedSub?.id)))
    : null;

  const currentItems = activeSub ? activeSub.items : (category.items || []);
  const itemCount = currentItems.length;

  // Detect if there's a specific change/item starting at this month
  const hasChangeAtThisAge = currentItems.some(item => item.startAgeMonths === currentAgeMonths);
  const isTransitionMonth = hasSubCategories && activeSub?.startMonth === currentAgeMonths;

  const renderSwitcher = () => {
    if (!hasSubCategories) return null;

    const switcherItems = category.subCategories!;

    switch (uiStyle) {
      case 'timeline':
        return (
          <div className="relative flex items-center justify-between px-2 py-4">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
            {switcherItems.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubId(sub.id)}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSubId === sub.id 
                    ? 'bg-blue-600 border-blue-600 scale-125' 
                    : 'bg-white border-gray-300 group-hover:border-gray-400'
                }`} />
                <span className={`text-[10px] mt-2 font-bold transition-colors ${
                  activeSubId === sub.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {sub.label}
                </span>
              </button>
            ))}
          </div>
        );

      case 'pills':
        return (
          <div className="flex flex-wrap gap-2">
            {switcherItems.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubId(sub.id)}
                className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
                  activeSubId === sub.id
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        );

      case 'stepper':
        return (
          <div className="flex gap-4 items-center">
            {switcherItems.map((sub, idx) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubId(sub.id)}
                className="flex items-center gap-2 group"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  activeSubId === sub.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-semibold ${
                  activeSubId === sub.id ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {sub.label}
                </span>
              </button>
            ))}
          </div>
        );

      case 'minimal':
        return (
          <div className="flex gap-6 border-b border-gray-100">
            {switcherItems.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubId(sub.id)}
                className={`pb-2 text-xs font-bold transition-all relative ${
                  activeSubId === sub.id
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {sub.label}
                {activeSubId === sub.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        );

      case 'tabs':
      default:
        return (
          <div className="flex p-1 bg-gray-100/80 rounded-lg self-start">
            {switcherItems.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubId(sub.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeSubId === sub.id
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={`bg-white border rounded-2xl p-5 flex flex-col gap-4 shadow-sm transition-all duration-500 ${
      isTransitionMonth || hasChangeAtThisAge 
        ? 'ring-2 ring-blue-400 ring-offset-4 border-blue-200' 
        : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
            {(isTransitionMonth || hasChangeAtThisAge) && (
              <span className="text-[10px] text-blue-600 font-bold uppercase animate-pulse">
                New This Month!
              </span>
            )}
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {renderSwitcher()}

      <div className="grid gap-3">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className={`${item.startAgeMonths === currentAgeMonths ? 'animate-in fade-in slide-in-from-left-2 duration-700' : ''}`}>
               <ItemCard item={item} />
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic py-4 text-center">No items listed yet.</p>
        )}
      </div>
    </div>
  );
};
