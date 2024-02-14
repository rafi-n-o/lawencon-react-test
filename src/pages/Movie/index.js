import M from "materialize-css";
import { useEffect, useState } from "react";
import Modal from "../../components/organisms/Movie/Modal";
import SectionMovies from "../../components/organisms/Movie/SectionMovies";
import SectionSearch from "../../components/organisms/Movie/SectionSearch";

const Movie = () => {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);

  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [poster, setPoster] = useState();
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [imdbID, setImdbID] = useState();
  const [type, setType] = useState();

  return (
    <div className="container">
      <SectionSearch
        search={search}
        setSearch={setSearch}
        setPageNumber={setPageNumber}
      />
      <SectionMovies
        search={search}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        setPoster={setPoster}
        setTitle={setTitle}
        setYear={setYear}
        setType={setType}
        setImdbID={setImdbID}
      />
      <Modal
        poster={poster}
        title={title}
        year={year}
        type={type}
        imdbID={imdbID}
      />
    </div>
  );
};

export default Movie;
