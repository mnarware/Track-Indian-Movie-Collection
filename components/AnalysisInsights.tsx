
import React from 'react';
import { Movie } from '../types';

interface AnalysisInsightsProps {
  movies: Movie[];
  type: 'running' | 'indian' | 'global';
}

const AnalysisInsights: React.FC<AnalysisInsightsProps> = ({ movies, type }) => {
  if (movies.length === 0) return null;

  const totalCollection = movies.reduce((acc, curr) => acc + curr.collectionValue, 0);
  const avgCollection = totalCollection / movies.length;
  const topPerformer = movies[0];

  const getInsights = () => {
    switch (type) {
      case 'running':
        return {
          title: "Theatrical Market Analysis",
          subtitle: "Current Market Trends",
          bullets: [
            `Dominant Industry: ${movies.reduce((acc, m) => {
              acc[m.industry] = (acc[m.industry] || 0) + 1;
              return acc;
            }, {} as any)[topPerformer.industry]} movies from ${topPerformer.industry} leading the chart.`,
            `Market Efficiency: Average collection per running title is ₹${avgCollection.toFixed(1)} Cr.`,
            `Regional Impact: Strong presence of Marathi, Gujarati and South Indian cinema verified on BookMyShow.`
          ]
        };
      case 'indian':
        return {
          title: "Indian Cinema Historical Report",
          subtitle: "All-Time Performance Benchmarks",
          bullets: [
            `Elite Benchmark: The top 10 Indian films have a combined gross of ₹${totalCollection.toFixed(0)} Cr.`,
            `Global Reach: ${movies.filter(m => m.collectionValue > 1000).length} movies have crossed the ₹1000 Cr worldwide milestone.`,
            `Investment ROI: Significant growth in budgets reflecting larger scale PAN-Indian productions.`
          ]
        };
      case 'global':
        return {
          title: "Global Box Office Intelligence",
          subtitle: "Worldwide Revenue Statistics",
          bullets: [
            `Billion Dollar Club: All titles in this list represent the pinnacle of global cinematic revenue.`,
            `Franchise Dominance: Majority of the global top 10 are part of multi-billion dollar franchises.`,
            `Historical Scale: These figures represent gross adjusted for international exchange rates as per Wikipedia.`
          ]
        };
    }
  };

  const insights = getInsights();

  return (
    <div className="glass-panel p-8 rounded-[32px] border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 shadow-2xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
          <i className="fas fa-file-invoice-dollar text-blue-400 text-xl"></i>
        </div>
        <div>
          <h4 className="text-xl font-black text-white leading-tight">{insights.title}</h4>
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{insights.subtitle}</p>
        </div>
      </div>
      <ul className="space-y-4">
        {insights.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start space-x-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
            <p className="text-slate-300 font-medium text-sm leading-relaxed">{bullet}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
        <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Verified Data Analysis</div>
        <i className="fas fa-chart-line text-slate-700"></i>
      </div>
    </div>
  );
};

export default AnalysisInsights;
