
import React from 'react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="group p-4 bg-white border border-gray-100 rounded-xl transition-all duration-200 hover:shadow-md hover:border-gray-200 cursor-pointer">
      <h4 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
        {item.title}
      </h4>
      <p className="text-xs text-gray-500 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
};
