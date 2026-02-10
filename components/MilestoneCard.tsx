
import React from 'react';
import { Item } from '../types';

interface MilestoneCardProps {
  item: Item;
  isNew?: boolean;
  onClick?: (item: Item) => void;
  className?: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ item, isNew, onClick, className = "" }) => {
  return (
    <div 
      onClick={() => onClick?.(item)}
      className={`group relative p-4 bg-white border rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer flex-1 ${
        isNew ? 'border-blue-200 ring-1 ring-blue-50' : 'border-gray-100'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
          {item.icon}
        </span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              {item.category}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isNew ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {item.startAgeMonths === 0 ? 'Birth' : `${item.startAgeMonths}mo`}
            </span>
          </div>
          <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
