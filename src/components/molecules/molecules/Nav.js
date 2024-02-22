const Nav = () => {
  return (
    <>
      <div className="navbar-fixed">
        <nav className="grey darken-1">
          <div className="container">
            <div className="nav-wrapper">
              <ul id="nav-mobile" class="right">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/Favorite">Favorites</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
