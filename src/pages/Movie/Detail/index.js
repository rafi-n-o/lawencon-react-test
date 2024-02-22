import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import Gap from "../../../components/atoms/Gap";
import { getMovie } from "../../../redux/action/omdb";

const MovieDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovie(id)
      .then((res) => {
        dispatch({
          type: "GET_MOVIE",
          payload: res,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { movie } = useSelector((state) => state.movie);

  let stars = [];
  for (let i = 0; i < Math.floor(movie.imdbRating); i++) {
    stars.push("star");
  }
  if (movie.imdbRating != Math.floor(movie.imdbRating)) {
    stars.push("star_half");
  }
  for (let i = 0; i < Math.floor(10 - movie.imdbRating); i++) {
    stars.push("star_border");
  }

  if (loading) {
    return (
      <div style={styles.loading}>
        <RiseLoader color="#757575" />
      </div>
    );
  }

  const addToFavorite = () => {
    alert("berhasil ditambahkan ke favorite");
    if (!JSON.parse(localStorage.getItem("favorites"))) {
      const arr = [];
      localStorage.setItem("favorites", JSON.stringify(arr));
      arr.push({ Poster: movie.Poster });
    } else {
      const arr = JSON.parse(localStorage.getItem("favorites"));
      arr.push({ Poster: movie.Poster });
      localStorage.setItem("favorites", JSON.stringify(arr));
    }
  };

  return (
    <div className="container">
      <Gap height={10} />
      <div className="row">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className="btn-flat"
            onClick={() => {
              addToFavorite();
            }}
          >
            <i className="material-icons">favorite</i>
          </button>
        </div>
        <div className="col s12 m4">
          <img src={`${movie.Poster}`} className="responsive-img" />
        </div>
        <div className="col s12 m8">
          <div style={styles.title}>
            <b>{movie.Title}</b>
          </div>
          <Gap height={10} />
          <div className="valign-wrapper">
            <div style={styles.rating}>{movie.imdbRating}/10</div>
            {stars.map((value) => (
              <i
                className="material-icons yellow-text text-darken-2"
                style={styles.star}
              >
                {value}
              </i>
            ))}
          </div>
          <Gap height={10} />
          <div style={styles.flex}>
            <div style={styles.marginRight}>{movie.Rated}</div>
            <div style={styles.marginRight}>{movie.Year}</div>
            <div>{movie.Genre}</div>
          </div>
          <Gap height={10} />
          <div style={styles.plot}>{movie.Plot}</div>
          <Gap height={10} />
          <div style={styles.writer}>
            <b>Written By:</b> {movie.Writer}
          </div>
          <Gap height={10} />
          <div style={styles.actors}>
            <b>Starring:</b> {movie.Actors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

const styles = {
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  title: { fontSize: 30 },
  rating: { fontSize: 20, marginRight: 5 },
  star: { fontSize: 24 },
  flex: { display: "flex", color: "#9e9e9e", fontSize: 18 },
  marginRight: { marginRight: 20 },
  plot: { fontSize: 18 },
  writer: { fontSize: 18 },
  actors: { fontSize: 18 },
};
