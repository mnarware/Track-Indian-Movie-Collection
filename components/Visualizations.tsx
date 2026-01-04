
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Movie } from '../types';

interface VisualizationsProps {
  movies: Movie[];
}

const Visualizations: React.FC<VisualizationsProps> = ({ movies }) => {
  const chartData = [...movies]
    .sort((a, b) => b.collectionValue - a.collectionValue)
    .slice(0, 10); // Top 10

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-xl mb-8 border border-slate-700/50">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <i className="fas fa-chart-bar mr-3 text-emerald-400"></i>
        Box Office Performance (in Crores)
      </h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              interval={0} 
              height={80}
              stroke="#94a3b8"
              fontSize={11}
            />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Bar dataKey="collectionValue" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Visualizations;
