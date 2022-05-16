export interface Genre {
  id: number;
  name: string;
}

export interface GenreList {
  genres: Genre[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieList {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface SerieDetail {
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface SerieList {
  page:          number;
  results:       Serie[];
  total_results: number;
  total_pages:   number;
}

export interface Serie {
  poster_path:       string;
  popularity:        number;
  id:                number;
  backdrop_path:     string;
  vote_average:      number;
  overview:          string;
  first_air_date:    Date;
  origin_country:    OriginCountry[];
  genre_ids:         number[];
  original_language: OriginalLanguage;
  vote_count:        number;
  name:              string;
  original_name:     string;
}

export enum OriginCountry {
  GB = "GB",
  Jp = "JP",
  Us = "US",
}

export enum OriginalLanguage {
  En = "en",
  Ja = "ja",
}

export interface Video {
  iso_639_1:    string;
  iso_3166_1:   string;
  name:         string;
  key:          string;
  site:         string;
  size:         number;
  type:         string;
  official:     boolean;
  published_at: Date;
  id:           string;
}

export interface GetVideos {
  id:      number;
  results: Video[];
}

export enum CategoryType {
  MOVIE = "movieApi",
  SERIE = "serieApi",
}

export type CategoryProp = CategoryType | false;

export interface ConfigAPI {
  images:      ImagesConfig;
  change_keys: string[];
}

export interface ImagesConfig {
  base_url:        string;
  secure_base_url: string;
  backdrop_sizes:  string[];
  logo_sizes:      string[];
  poster_sizes:    string[];
  profile_sizes:   string[];
  still_sizes:     string[];
}
