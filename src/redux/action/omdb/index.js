import Api from "../../../api/Api";

const apiKey = process.env.REACT_APP_API_KEY;

const getMovies = (search = "", page) => {
  return new Promise((resolve, reject) => {
    Api.get(`?apikey=${apiKey}&s=${search}&page=${page}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMovie = (id) => {
  return new Promise((resolve, reject) => {
    Api.get(`?apikey=${apiKey}&i=${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getMovies, getMovie };
