
import React, { useState } from 'react';
import { Movie } from '../types';

interface MovieTableProps {
  movies: Movie[];
  title: string;
  icon: string;
  colorClass: string;
}

type SortKey = 'name' | 'releaseDate' | 'collectionValue' | 'budget';

const MovieTable: React.FC<MovieTableProps> = ({ movies, title, icon, colorClass }) => {
  const [sortKey, setSortKey] = useState<SortKey>('collectionValue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState('');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredMovies = movies
    .filter(m => 
      m.name.toLowerCase().includes(filter.toLowerCase()) || 
      m.industry.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const factor = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'collectionValue') {
        return (a.collectionValue - b.collectionValue) * factor;
      }
      return String(a[sortKey]).localeCompare(String(b[sortKey])) * factor;
    });

  return (
    <div className="glass-panel rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 flex flex-col h-full bg-[#0d121f]/95 transition-all duration-300">
      <div className="p-4 md:p-5 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-base md:text-lg font-bold flex items-center text-white">
          <i className={`fas ${icon} mr-3 ${colorClass}`}></i>
          {title}
        </h3>
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-slate-800/40 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-[10px] md:text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-40 transition-all text-slate-200"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/60 text-slate-500 text-[9px] uppercase tracking-[0.25em] font-black">
              <th className="px-5 py-3 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>Movie</th>
              <th className="px-5 py-3">Industry</th>
              <th className="px-5 py-3 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('collectionValue')}>Collection</th>
              <th className="px-5 py-3 text-right">Budget</th>
              <th className="px-5 py-3">Release</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="hover:bg-slate-800/40 transition-all group cursor-default">
                <td className="px-5 py-3 font-bold text-slate-100 text-base tracking-tight group-hover:text-blue-400 transition-colors">
                  {movie.name}
                </td>
                <td className="px-5 py-3">
                  <span className="text-[9px] bg-slate-700/30 px-2 py-0.5 rounded border border-slate-600/50 text-slate-400 font-bold uppercase tracking-widest">
                    {movie.industry}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="text-emerald-400 font-black text-lg">{movie.collection}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="text-amber-400 font-bold text-xs opacity-80">{movie.budget}</span>
                </td>
                <td className="px-5 py-3 text-slate-600 text-[11px] font-bold">
                  {movie.releaseDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card-Style View */}
      <div className="md:hidden flex flex-col divide-y divide-slate-800/50">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="p-4 hover:bg-slate-800/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-black text-white leading-tight mb-1">{movie.name}</h4>
                <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-500 font-bold uppercase tracking-widest">
                  {movie.industry}
                </span>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-black text-sm">{movie.collection}</div>
                <div className="text-[9px] text-amber-500/70 font-bold">Budget: {movie.budget}</div>
              </div>
            </div>
            <div className="text-[9px] text-slate-600 font-bold flex items-center">
              <i className="fas fa-calendar-day mr-1.5 opacity-50"></i>
              Released: {movie.releaseDate}
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="px-5 py-12 text-center text-slate-600 text-sm font-medium italic">
          No cinematic records found.
        </div>
      )}
    </div>
  );
};

export default MovieTable;
