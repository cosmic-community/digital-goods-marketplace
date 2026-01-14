'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogCategory } from '@/types';

interface CategoryCardProps {
  category: BlogCategory;
  postCount?: number;
}

export default function CategoryCard({ category, postCount }: CategoryCardProps) {
  const color = category.metadata.color || '#00ffff';
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link href={`/blog/categories/${category.slug}`}>
      <div className="cyber-card rounded-xl p-6 card-hover group relative overflow-hidden">
        {/* Corner Accent with category color */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-px h-8 transition-all"
            style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
          ></div>
          <div 
            className="absolute top-0 right-0 h-px w-8 transition-all"
            style={{ background: `linear-gradient(to left, ${color}, transparent)` }}
          ></div>
        </div>
        
        {/* Color indicator */}
        <div 
          className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, borderColor: `${color}50`, borderWidth: '1px' }}
        >
          <span className="text-2xl">📁</span>
        </div>
        
        <h3 
          className="font-display font-semibold tracking-wide text-lg mb-2 transition-colors"
          style={{ color: isHovered ? color : 'white' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {category.metadata.name}
        </h3>
        
        {category.metadata.description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {category.metadata.description}
          </p>
        )}
        
        {postCount !== undefined && (
          <span className="text-sm font-display tracking-wider" style={{ color }}>
            {postCount} {postCount === 1 ? 'POST' : 'POSTS'}
          </span>
        )}
        
        {/* Bottom accent line with category color */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(to right, transparent, ${color}80, transparent)` }}
        ></div>
      </div>
    </Link>
  );
}