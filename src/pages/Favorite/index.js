import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiseLoader } from "react-spinners";
import { getFavorites } from "../../redux/action/omdb";

const Favorite = () => {
  const [loading, setLoading] = useState(true);

  const { movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_MOVIES",
      payload: JSON.parse(getFavorites()),
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <RiseLoader color="#757575" />
      </div>
    );
  }

  return (
    <div className="row" style={styles.container}>
      {movies.map((value, index) => {
        return (
          <div className="col s6 m4 l3" style={styles.movie} key={index}>
            <div className="card">
              <div class="card-image">
                <img
                  src={`${value.Poster}`}
                  className="responsive-img"
                  style={styles.image}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorite;

const styles = {
  container: { marginLeft: -10, marginRight: -10 },
  image: { height: 300 },
  movie: { paddingRight: 10, paddingLeft: 10 },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
};
