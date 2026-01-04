
import React, { useState, useEffect, useCallback } from 'react';
import { CinemaDashboardData, FetchState } from './types';
import { fetchCinemaData } from './services/geminiService';
import StatsCards from './components/StatsCards';
import MovieTable from './components/MovieTable';
import Visualizations from './components/Visualizations';
import AnalysisInsights from './components/AnalysisInsights';

type ActiveTab = 'running' | 'indian_all' | 'global_all';

const App: React.FC = () => {
  const [data, setData] = useState<CinemaDashboardData | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('running');

  const loadData = useCallback(async () => {
    setFetchState(FetchState.LOADING);
    setError(null);
    try {
      const result = await fetchCinemaData();
      setData(result);
      setFetchState(FetchState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError("Synchronization failed. Please verify network status and API configuration.");
      setFetchState(FetchState.ERROR);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen pb-20 bg-[#06080e] text-slate-200 selection:bg-blue-500/30">
      {/* Dynamic Navbar */}
      <nav className="glass-panel sticky top-0 z-50 px-8 py-5 flex items-center justify-between border-b border-slate-800/50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 group">
            <i className="fas fa-film text-white text-xl group-hover:scale-110 transition-transform"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-500">
              BOX OFFICE ELITE
            </h1>
            <p className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase -mt-1">Real-Time Data Intelligence</p>
          </div>
        </div>

        {/* Tab Navigation (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'running', label: 'Live Theaters', icon: 'fa-ticket-alt' },
            { id: 'indian_all', label: 'Indian Records', icon: 'fa-medal' },
            { id: 'global_all', label: 'Global Records', icon: 'fa-globe' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-xl border border-blue-500/50' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <i className={`fas ${tab.icon} text-xs ${activeTab === tab.id ? 'text-white' : 'text-slate-600'}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-8">
          <button 
            onClick={loadData}
            disabled={fetchState === FetchState.LOADING}
            className={`p-3 rounded-2xl transition-all border ${
              fetchState === FetchState.LOADING 
                ? 'bg-slate-900 border-slate-800 text-slate-700' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 active:scale-95 shadow-xl'
            }`}
            title="Refresh Data"
          >
            <i className={`fas fa-sync-alt ${fetchState === FetchState.LOADING ? 'animate-spin' : ''}`}></i>
          </button>
          
          {/* Profile Image with Hover Tooltip - Manoj Narware (Updated Male Avatar) */}
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500 p-0.5 overflow-hidden shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-all duration-500 bg-slate-900">
               <img 
                 src="https://raw.githubusercontent.com/mnarware/mnarware/main/Manoj.jpg" 
                 alt="Manoj Narware" 
                 className="w-full h-full object-cover rounded-full"
                 onError={(e) => {
                   // Fallback to a clearly male-style avatar
                   (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=ManojNarware&backgroundColor=06080e&mouth=smile&topType=shortHair&facialHairType=beardLight&hairColor=black&clotheType=suitAndTie&clotheColor=262e3d`;
                 }}
               />
            </div>
            {/* Tooltip Popup */}
            <div className="absolute right-0 top-16 w-64 bg-[#0a0f1c] border border-blue-500/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(59,130,246,0.25)] opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-y-4 group-hover:translate-y-0 duration-500 z-[100] scale-90 group-hover:scale-100">
               <div className="absolute -top-2 right-6 w-4 h-4 bg-[#0a0f1c] border-t border-l border-blue-500/30 rotate-45"></div>
               <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-blue-500/50 mb-3 overflow-hidden shadow-inner">
                    <img 
                      src="https://raw.githubusercontent.com/mnarware/mnarware/main/Manoj.jpg" 
                      alt="Manoj" 
                      className="w-full h-full object-cover"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=ManojNarware&topType=shortHair&facialHairType=beardLight&clotheType=suitAndTie'; 
                      }}
                    />
                  </div>
                  <p className="text-[10px] font-black text-blue-500 mb-1 uppercase tracking-widest">Developer</p>
                  <p className="text-xl font-black text-white tracking-tight leading-none">Manoj Narware</p>
                  <div className="mt-4 h-px w-full bg-slate-800"></div>
                  <div className="mt-4 flex space-x-6 text-slate-400">
                    <a href="https://github.com/mnarware" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-125"><i className="fab fa-github"></i></a>
                    <a href="https://linkedin.com/in/manoj-narware-8521b414b" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all transform hover:scale-125"><i className="fab fa-linkedin"></i></a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 pt-12">
        {fetchState === FetchState.LOADING && (
          <div className="flex flex-col items-center justify-center py-56">
            <div className="relative">
              <div className="w-28 h-28 border-4 border-blue-500/10 rounded-full scale-110"></div>
              <div className="w-28 h-28 border-4 border-t-blue-500 rounded-full animate-spin absolute top-0 left-0 scale-110"></div>
              <i className="fas fa-search-dollar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-3xl animate-pulse"></i>
            </div>
            <p className="text-2xl font-black text-white mt-12 tracking-tight">Accessing High-Precision Wikipedia Logs...</p>
            <p className="text-sm text-slate-500 mt-3 font-mono uppercase tracking-widest">Cross-referencing BookMyShow schedule</p>
          </div>
        )}

        {fetchState === FetchState.ERROR && (
          <div className="glass-panel p-16 rounded-[40px] border-red-900/30 text-center max-w-2xl mx-auto mt-24 shadow-2xl">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <i className="fas fa-exclamation-triangle text-4xl text-red-500"></i>
            </div>
            <h2 className="text-3xl font-black mb-4 text-white uppercase tracking-tighter">Sync Interrupted</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">{error}</p>
            <button onClick={loadData} className="w-full py-5 bg-red-600 hover:bg-red-500 rounded-2xl font-black text-lg transition-all text-white shadow-2xl shadow-red-900/40">
              Try to Sync Again
            </button>
          </div>
        )}

        {fetchState === FetchState.SUCCESS && data && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Mobile Tab Select */}
            <div className="flex lg:hidden bg-slate-900/60 p-2 rounded-2xl border border-slate-800 mb-8">
               <select 
                  className="w-full bg-transparent p-3 text-base font-black text-white focus:outline-none appearance-none cursor-pointer"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as ActiveTab)}
               >
                  <option value="running">Theatrical Window</option>
                  <option value="indian_all">Indian All-Time Records</option>
                  <option value="global_all">Global Cinematic Benchmarks</option>
               </select>
            </div>

            {/* TAB CONTENT: CURRENTLY PLAYING */}
            {activeTab === 'running' && (
              <section className="animate-in fade-in zoom-in-95 duration-700">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <h2 className="text-4xl font-black text-white flex items-center">
                      <span className="w-3 h-12 bg-blue-600 mr-5 rounded-full"></span>
                      Theatrical Live Track
                    </h2>
                    <p className="text-slate-500 mt-2 font-bold ml-8">High-precision sync with BookMyShow & Official Trade Figures</p>
                  </div>
                  <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                    Live Data Active
                  </div>
                </div>
                <StatsCards movies={data.runningMovies} />
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="xl:col-span-8">
                    <MovieTable 
                      movies={data.runningMovies} 
                      title="Current Running Movies" 
                      icon="fa-film"
                      colorClass="text-blue-500"
                    />
                  </div>
                  <div className="xl:col-span-4 space-y-10">
                    <AnalysisInsights movies={data.runningMovies} type="running" />
                    <Visualizations movies={data.runningMovies} />
                  </div>
                </div>
              </section>
            )}

            {/* TAB CONTENT: INDIAN ALL-TIME */}
            {activeTab === 'indian_all' && (
              <section className="animate-in fade-in zoom-in-95 duration-700">
                <div className="flex items-center mb-10">
                  <span className="w-3 h-12 bg-emerald-600 mr-5 rounded-full"></span>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Indian Legends</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                   <div className="xl:col-span-8">
                      <MovieTable 
                        movies={data.topIndianAllTime} 
                        title="Top 10 Indian All-Time Grossers" 
                        icon="fa-award"
                        colorClass="text-emerald-400"
                      />
                   </div>
                   <div className="xl:col-span-4 space-y-10">
                      <AnalysisInsights movies={data.topIndianAllTime} type="indian" />
                      <div className="glass-panel p-8 rounded-[32px] border border-emerald-500/20 bg-emerald-900/5">
                         <h4 className="font-black text-emerald-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Industry Spotlight</h4>
                         <p className="text-base text-slate-400 leading-relaxed font-medium">Historical data verified via Wikipedia's official 'List of highest-grossing Indian films'. Figures reflect worldwide gross in INR.</p>
                      </div>
                   </div>
                </div>
              </section>
            )}

            {/* TAB CONTENT: GLOBAL ALL-TIME */}
            {activeTab === 'global_all' && (
              <section className="animate-in fade-in zoom-in-95 duration-700">
                <div className="flex items-center mb-10">
                  <span className="w-3 h-12 bg-amber-600 mr-5 rounded-full"></span>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Global Giants</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="xl:col-span-8">
                    <MovieTable 
                      movies={data.topWorldwideAllTime} 
                      title="Highest Grossing Movies Worldwide" 
                      icon="fa-globe-americas"
                      colorClass="text-amber-400"
                    />
                  </div>
                  <div className="xl:col-span-4 space-y-10">
                    <AnalysisInsights movies={data.topWorldwideAllTime} type="global" />
                    <div className="glass-panel p-8 rounded-[32px] border border-amber-500/20 bg-amber-900/5">
                       <h4 className="font-black text-amber-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Global Financials</h4>
                       <p className="text-base text-slate-400 leading-relaxed font-medium">Tracking billion-dollar records from international trade registries as cataloged by Wikipedia.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Data Grounding & Verified Sources */}
            <div className="glass-panel p-10 rounded-[40px] border border-slate-800/60 mt-20 bg-[#0a0f1c]/50">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-3 flex items-center">
                    <i className="fas fa-fingerprint mr-4 text-blue-500"></i>
                    Verification & Grounding Architecture
                  </h3>
                  <p className="text-base text-slate-500 font-medium leading-relaxed max-w-4xl">
                    Our intelligence engine utilizes real-time Google Search Grounding to verify theatrical availability on BookMyShow and cross-references historical financials with Wikipedia's extensive database, ensuring precise tracking of regional hits like Marathi and Gujarati cinema.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {data.sources.slice(0, 5).map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white hover:border-blue-500 transition-all flex items-center group shadow-2xl"
                    >
                      <i className="fas fa-external-link-alt mr-3 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></i>
                      {source.title.split('|')[0].trim()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Premium Footer */}
      <footer className="mt-32 py-24 bg-slate-950/90 backdrop-blur-3xl border-t border-slate-900">
        <div className="max-w-[1600px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          
          <div className="space-y-6">
            <h4 className="text-2xl font-black text-white tracking-tighter uppercase">Box Office Elite</h4>
            <p className="text-base text-slate-500 leading-relaxed max-w-sm font-medium">
              A high-precision platform for theatrical analysis and cinematic data visualization.
            </p>
            <div className="pt-6 border-t border-slate-900">
               <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] mb-1">Lead Developer</p>
               <p className="text-2xl font-black text-blue-500 tracking-tight">Manoj Narware</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-12">
             <div className="flex items-center space-x-12 opacity-10 grayscale hover:grayscale-0 transition-all duration-1000">
                <i className="fab fa-wikipedia-w text-6xl"></i>
                <i className="fas fa-theater-masks text-6xl"></i>
                <i className="fas fa-chart-pie text-6xl"></i>
             </div>
             <div className="text-[10px] text-slate-700 font-black tracking-[0.5em] uppercase border-y border-slate-900/30 py-4 w-full text-center">
                Wikipedia Verified Intelligence
             </div>
          </div>

          <div className="space-y-8">
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-l-4 border-blue-600 pl-4">Digital Profile</h4>
             <div className="flex items-center justify-center md:justify-start space-x-8">
                <a href="https://github.com/mnarware" target="_blank" rel="noopener noreferrer" className="text-4xl text-slate-700 hover:text-white transition-all transform hover:-translate-y-2" title="GitHub">
                   <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/manoj-narware-8521b414b" target="_blank" rel="noopener noreferrer" className="text-4xl text-slate-700 hover:text-[#0077b5] transition-all transform hover:-translate-y-2" title="LinkedIn">
                   <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.facebook.com/manoj.narware.9/" target="_blank" rel="noopener noreferrer" className="text-4xl text-slate-700 hover:text-[#1877f2] transition-all transform hover:-translate-y-2" title="Facebook">
                   <i className="fab fa-facebook"></i>
                </a>
             </div>
             <p className="text-xs text-slate-600 font-bold italic pt-6">© {new Date().getFullYear()} Manoj Narware. Engineered for Perfection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
