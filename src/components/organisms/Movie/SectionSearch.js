import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../redux/action/omdb";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import Gap from "../../atoms/Gap";

const SectionSearch = ({ search, setSearch, setPageNumber }) => {
  const [loadingSearchBox, setLoadingSearchBox] = useState(false);

  const { search_box_movies } = useSelector((state) => state.searchBoxMovies);

  const dispatch = useDispatch();

  const searchMovies = (search, pageNumber) => {
    setLoadingSearchBox(true);
    getMovies(encodeURIComponent(search), pageNumber)
      .then((res) => {
        if (res.Response !== "False") {
          dispatch({
            type: "GET_SEARCH_BOX_MOVIES",
            payload: res.Search,
          });
          dispatch({
            type: "GET_MOVIES",
            payload: res.Search,
          });
        } else {
          dispatch({
            type: "GET_SEARCH_BOX_MOVIES",
            payload: [],
          });
          dispatch({
            type: "GET_MOVIES",
            payload: [],
          });
        }
        setTimeout(() => {
          setLoadingSearchBox(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const btnClear = () => {
    setSearch("");
    dispatch({
      type: "GET_SEARCH_BOX_MOVIES",
      payload: [],
    });
  };

  return (
    <>
      <div
        className="valign-wrapper card"
        style={
          search_box_movies.length ? styles.searchNotNull : styles.searchNull
        }
      >
        <i className="material-icons" style={{ padding: 10 }}>
          search
        </i>
        <input
          type="text"
          style={{ borderBottom: "none", outline: "none" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageNumber(1);
            searchMovies(e.target.value, 1);
          }}
        />
        <button
          className="waves-effect btn-flat"
          onClick={() => {
            btnClear();
          }}
        >
          <i className="material-icons">clear</i>
        </button>
      </div>
      {search_box_movies.length ? (
        <div className="card" style={styles.searchBox}>
          {search_box_movies.map((value, index) => (
            <a
              href="#"
              key={index}
              onClick={() => {
                setSearch(value.Title);
                setPageNumber(1);
                searchMovies(value.Title, 1);
              }}
            >
              <div className="valign-wrapper grey-text text-darken-3">
                <i className="material-icons" style={{ margin: 5 }}>
                  search
                </i>{" "}
                {value.Title}
              </div>
            </a>
          ))}
          <div className="center">
            {loadingSearchBox && (
              <>
                <Gap height={10} />
                <SyncLoader color="#757575" />
                <Gap height={10} />
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SectionSearch;

const styles = {
  searchNull: { borderRadius: 10 },
  searchNotNull: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0,
  },
  searchBox: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
};
