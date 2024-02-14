const stateSearchBoxMovies = {
  search_box_movies: [],
};

const stateMovies = {
  movies: [],
};

const stateMovie = {
  movie: {},
};

const searchBoxMovies = (state = stateSearchBoxMovies, action) => {
  if (action.type === "GET_SEARCH_BOX_MOVIES") {
    return { ...state, search_box_movies: action.payload };
  }

  return state;
};

const movies = (state = stateMovies, action) => {
  if (action.type === "GET_MOVIES") {
    return { ...state, movies: action.payload };
  }

  if (action.type === "UPDATE_MOVIES") {
    return { ...state, movies: state.movies.concat(action.payload) };
  }

  return state;
};

const movie = (state = stateMovie, action) => {
  if (action.type === "GET_MOVIE") {
    return {
      ...state,
      movie: action.payload,
    };
  }

  return state;
};

export { searchBoxMovies, movies, movie };
