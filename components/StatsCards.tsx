
import React from 'react';
import { Movie } from '../types';

interface StatsCardsProps {
  movies: Movie[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ movies }) => {
  const topMovie = [...movies].sort((a, b) => b.collectionValue - a.collectionValue)[0];
  const totalCollections = movies.reduce((acc, curr) => acc + curr.collectionValue, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-blue-500 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Running Movies</span>
          <i className="fas fa-film text-blue-500 text-xl"></i>
        </div>
        <div className="text-3xl font-bold">{movies.length}</div>
        <div className="text-xs text-slate-500 mt-2">Currently tracked in theaters</div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Highest Grosser</span>
          <i className="fas fa-trophy text-emerald-500 text-xl"></i>
        </div>
        <div className="text-xl font-bold truncate">{topMovie?.name || 'N/A'}</div>
        <div className="text-lg text-emerald-400 font-semibold">{topMovie ? `₹${topMovie.collectionValue} Cr+` : '-'}</div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-500 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Combined Box Office</span>
          <i className="fas fa-coins text-amber-500 text-xl"></i>
        </div>
        <div className="text-3xl font-bold">₹{totalCollections.toFixed(1)} Cr</div>
        <div className="text-xs text-slate-500 mt-2">Total revenue from current line-up</div>
      </div>
    </div>
  );
};

export default StatsCards;
