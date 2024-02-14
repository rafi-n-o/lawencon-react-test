import { combineReducers } from "redux";
import { movie, movies, searchBoxMovies } from "./omdb";

const reducer = combineReducers({
  searchBoxMovies,
  movies,
  movie,
});

export default reducer;
