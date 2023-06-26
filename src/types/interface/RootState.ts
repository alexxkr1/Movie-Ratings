export interface ISearchResults {
  movie: {
    searchResults: {
      poster_path: string;
      title: string;
      vote_average: number;
    }[];
    totalSearchPageResults: number;
    isLoading: boolean;
  };
}

export interface ITVMovies {
  movie: {
    tvShows: {
      name: string;
      poster_path: string;
      vote_average: number;
    }[];
    totalResultsTVShows: number;
    isLoading: boolean;
  };
}

export interface IMovies {
  movie: {
    movies: {
      poster_path: string;
      title: string;
      vote_average: number;
    }[];
    totalResultsMovies: number;
    isLoading: boolean;
  };
}
