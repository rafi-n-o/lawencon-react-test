import React from "react";
import Gap from "../../atoms/Gap";

const Modal = ({ poster, title, year, type, imdbID }) => {
  return (
    <div id="modal1" class="modal">
      <div class="modal-content row">
        <div className="col s12 m4">
          <img src={poster} className="responsive-img" />
        </div>
        <div className="col s12 m8">
          <div style={styles.title}>
            <b>{title}</b>
          </div>
          <Gap height={5} />
          <div style={styles.year}>({year})</div>
          <Gap height={5} />
          <div style={styles.type}>Type: {type?.toUpperCase()}</div>
          <Gap height={15} />
          <a href={`/${imdbID}`} className="btn grey darken-1">
            Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;

const styles = {
  title: { fontSize: 24 },
  year: { fontSize: 18 },
  type: { fontSize: 17 },
};
