import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainApp from "./layouts/MainApp";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/Movie/Detail";
import store from "./redux/store";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainApp />}>
            <Route index element={<Movie />} />
            <Route path=":id" element={<MovieDetail />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
