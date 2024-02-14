import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { getMovies } from "../../../redux/action/omdb";
import Gap from "../../atoms/Gap";

const SectionMovies = ({
  search,
  pageNumber,
  setPageNumber,
  setPoster,
  setTitle,
  setYear,
  setType,
  setImdbID,
}) => {
  const [loading, setLoading] = useState(false);

  const { movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (pageNumber > 1) {
      getMovies(encodeURIComponent(search), pageNumber)
        .then((res) => {
          if (res.Response !== "False") {
            dispatch({
              type: "UPDATE_MOVIES",
              payload: res.Search,
            });
          }
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  }, [pageNumber]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  return (
    <>
      <div className="row" style={styles.container}>
        {movies.map((value, index) => {
          const isLastElement = movies.length === index + 1;
          if (isLastElement && movies.length > 9) {
            return (
              <a
                href="#modal1"
                className="col s6 m4 l3 modal-trigger"
                style={styles.movie}
                onClick={() => {
                  setPoster(value.Poster);
                  setTitle(value.Title);
                  setYear(value.Year);
                  setType(value.Type);
                  setImdbID(value.imdbID);
                }}
              >
                <div className="card" ref={lastElementRef}>
                  <div class="card-image">
                    <img
                      src={`${value.Poster}`}
                      className="responsive-img"
                      style={styles.image}
                    />
                  </div>
                </div>
              </a>
            );
          } else {
            return (
              <a
                href="#modal1"
                className="col s6 m4 l3 modal-trigger"
                style={styles.movie}
                onClick={() => {
                  setPoster(value.Poster);
                  setTitle(value.Title);
                  setYear(value.Year);
                  setType(value.Type);
                  setImdbID(value.imdbID);
                }}
              >
                <div className="card">
                  <div class="card-image">
                    <img
                      src={`${value.Poster}`}
                      className="responsive-img"
                      style={styles.image}
                    />
                  </div>
                </div>
              </a>
            );
          }
        })}
      </div>
      <div className="center">
        {loading ? (
          <>
            <SyncLoader color="#757575" />
            <Gap height={50} />
          </>
        ) : (
          !movies.length && <div>Silahkan Cari Film Favoritmu...</div>
        )}
      </div>
    </>
  );
};

export default SectionMovies;

const styles = {
  container: { marginLeft: -10, marginRight: -10 },
  image: { height: 300 },
  movie: { paddingRight: 10, paddingLeft: 10 },
};
