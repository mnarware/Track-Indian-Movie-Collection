
export interface Movie {
  id: string;
  name: string;
  releaseDate: string;
  collection: string; // Display string (e.g., "₹450 Cr")
  collectionValue: number; // Numeric value in Crores (for Indian) or Billions (for Global)
  budget: string; // Display string (e.g., "₹150 Cr")
  language: string;
  industry: string; // Industry/Region
  status?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface CinemaDashboardData {
  runningMovies: Movie[];
  topIndianAllTime: Movie[];
  topWorldwideAllTime: Movie[];
  sources: GroundingSource[];
  lastUpdated: string;
}

export enum FetchState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
